import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Users as UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ApiError, get } from "../api/client";
import { ENDPOINT } from "../api/endpoints";
import Badge from "../components/Badge";
import { TableSkeleton } from "../components/SkeletonLoader";
import { useAuth } from "../hooks/useAuth";

const PAGE_SIZE = 10;

interface ApiUsersResponse {
  message?: string;
  users?: unknown[];
}

interface RawUser {
  _id?: string;
  id?: string | number;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
  isActive?: boolean;
  phone?: string;
  mobile?: string;
  phoneNumber?: string;
  createdAt?: string;
  created_at?: string;
  joinDate?: string;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinedOn: string;
  initials: string;
  avatarColor: string;
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-rose-500",
];

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function pickAvatarColor(seed: string) {
  const total = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}

function getUserName(user: RawUser) {
  const fullName = user.fullName?.trim();
  if (fullName) {
    return fullName;
  }

  const name = user.name?.trim();
  if (name) {
    return name;
  }

  const combinedName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (combinedName) {
    return combinedName;
  }

  if (user.email) {
    return toTitleCase(user.email.split("@")[0] ?? "User");
  }

  return "Unknown User";
}

function normalizeUser(user: RawUser, index: number): UserRow {
  const name = getUserName(user);
  const email = user.email?.trim() || "No email provided";
  const role = user.role?.trim().toLowerCase() || "user";
  const status =
    user.status?.trim().toLowerCase() ??
    (user.isActive === false ? "inactive" : "active");
  const phone = user.phone ?? user.mobile ?? user.phoneNumber ?? "—";
  const joinedOn = formatDate(user.createdAt ?? user.created_at ?? user.joinDate);
  const id = String(user._id ?? user.id ?? user.email ?? `user-${index}`);

  return {
    id,
    name,
    email,
    phone,
    role,
    status,
    joinedOn,
    initials: getInitials(name) || "U",
    avatarColor: pickAvatarColor(id),
  };
}

async function fetchUsers() {
  return get<ApiUsersResponse | RawUser[]>(ENDPOINT.GET_USERS, { auth: true });
}

export default function Users() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (error instanceof ApiError && [401, 403].includes(error.status)) {
      logout();
      navigate({ to: "/login" });
    }
  }, [error, logout, navigate]);

  const users = useMemo(() => {
    const payload = Array.isArray(data) ? data : (data?.users ?? []);
    return payload.map((user, index) => normalizeUser(user as RawUser, index));
  }, [data]);

  const roleOptions = useMemo(
    () => ["all", ...new Set(users.map((user) => user.role))],
    [users],
  );

  const statusOptions = useMemo(
    () => ["all", ...new Set(users.map((user) => user.status))],
    [users],
  );

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeUsers = users.filter((user) => user.status === "active").length;

  const selectClass =
    "bg-muted border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Total Users
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <UsersIcon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {users.length}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Active Users
          </p>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {activeUsers}
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Inactive Users
          </p>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {Math.max(users.length - activeUsers, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            data-ocid="users.search.input"
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          data-ocid="users.role.select"
          className={selectClass}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role === "all" ? "All Roles" : toTitleCase(role)}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          data-ocid="users.status.select"
          className={selectClass}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status === "all" ? "All Status" : toTitleCase(status)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-5">
            <TableSkeleton rows={8} />
          </div>
        ) : error ? (
          <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
              <AlertCircle className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Unable to load users
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading users."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["User", "Email", "Phone", "Role", "Status", "Joined"].map(
                    (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3"
                    >
                      {h}
                    </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-muted/30 transition-colors"
                    data-ocid={`users.row.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.phone}
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={user.role} variant="role" />
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={user.status} variant="status" />
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.joinedOn}
                    </td>
                  </motion.tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-muted-foreground text-sm"
                      data-ocid="users.empty_state"
                    >
                      {users.length === 0
                        ? "No users have been returned by the API yet."
                        : "No users found matching your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {filtered.length === 0
                ? "Showing 0 of 0 users"
                : `Showing ${Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} users`}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                data-ocid="users.pagination_prev"
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground px-2">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                data-ocid="users.pagination_next"
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
