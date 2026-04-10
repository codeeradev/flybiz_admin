import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  LayoutDashboard,
  LayoutTemplate,
  Megaphone,
  Settings,
  Share2,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    ocid: "sidebar.dashboard.link",
  },
  { label: "Users", path: "/users", icon: Users, ocid: "sidebar.users.link" },
  {
    label: "AI Content",
    path: "/ai-content",
    icon: Sparkles,
    ocid: "sidebar.ai-content.link",
  },
  {
    label: "Social Media",
    path: "/social-media",
    icon: Share2,
    ocid: "sidebar.social-media.link",
  },
  {
    label: "Campaigns",
    path: "/campaigns",
    icon: Megaphone,
    ocid: "sidebar.campaigns.link",
  },
  {
    label: "Templates",
    path: "/templates",
    icon: LayoutTemplate,
    ocid: "sidebar.templates.link",
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    ocid: "sidebar.analytics.link",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    ocid: "sidebar.settings.link",
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const state = useRouterState();
  const currentPath = state.location.pathname;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-glow">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-display font-bold text-lg gradient-text">
          FlyBiz
        </span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto lg:hidden text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                to={item.path}
                onClick={onClose}
                data-ocid={item.ocid}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-pink-500/5 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                )}
                <Icon
                  className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? "text-blue-400" : ""}`}
                  style={{ width: 18, height: 18 }}
                />
                <span className={isActive ? "gradient-text font-semibold" : ""}>
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 lg:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
