type Role = "admin" | "manager" | "moderator";

const PERMISSIONS: Record<Role, string[]> = {
  admin: [
    "dashboard",
    "users",
    "ai-content",
    "social-media",
    "campaigns",
    "templates",
    "analytics",
    "settings",
  ],
  manager: [
    "dashboard",
    "users",
    "ai-content",
    "social-media",
    "campaigns",
    "templates",
    "analytics",
  ],
  moderator: ["dashboard", "ai-content", "social-media", "templates"],
};

export function hasPermission(role: Role | null, page: string): boolean {
  if (!role) return false;
  return PERMISSIONS[role]?.includes(page) ?? false;
}

export function canManageUsers(role: Role | null): boolean {
  return role === "admin" || role === "manager";
}

export function canAccessSettings(role: Role | null): boolean {
  return role === "admin";
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    admin: "Admin",
    manager: "Manager",
    moderator: "Moderator",
  };
  return labels[role] ?? role;
}
