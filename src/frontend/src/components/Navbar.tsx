import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/ai-content": "AI Content",
  "/social-media": "Social Media",
  "/campaigns": "Campaigns",
  "/templates": "Templates",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const state = useRouterState();
  const title = PAGE_TITLES[state.location.pathname] ?? "FlyBiz";

  const [notifCount] = useState(4);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-20 flex items-center px-4 gap-3">
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page Title */}
      <h1 className="font-display font-semibold text-foreground hidden sm:block mr-2">
        {title}
      </h1>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          data-ocid="navbar.search.input"
          className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          data-ocid="navbar.notifications.button"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {notifCount}
            </span>
          )}
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          data-ocid="navbar.theme.toggle"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 ml-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-default">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm font-medium text-foreground hidden md:block">
            {user?.name}
          </span>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          data-ocid="navbar.logout.button"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </motion.button>
      </div>
    </header>
  );
}
