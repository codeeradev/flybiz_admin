import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { getStoredAuth } from "./api/storage";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AIContent from "./pages/AIContent";
import Analytics from "./pages/Analytics";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import SocialMedia from "./pages/SocialMedia";
import Templates from "./pages/Templates";
import Users from "./pages/Users";

function requireAuth() {
  const auth = getStoredAuth();
  if (!auth?.token) throw redirect({ to: "/login" });
}

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider
      attribute="class"
      storageKey="flybiz_theme"
      defaultTheme="dark"
    >
      <AuthProvider>
        <Outlet />
        <Toaster position="bottom-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const auth = getStoredAuth();
    throw redirect({ to: auth?.token ? "/dashboard" : "/login" });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <AuthLayout>
      <Login />
    </AuthLayout>
  ),
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  beforeLoad: requireAuth,
  component: () => <MainLayout />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

const usersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/users",
  component: Users,
});

const aiContentRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/ai-content",
  component: AIContent,
});

const socialMediaRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/social-media",
  component: SocialMedia,
});

const campaignsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/campaigns",
  component: Campaigns,
});

const templatesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/templates",
  component: Templates,
});

const analyticsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/analytics",
  component: Analytics,
});

const settingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/settings",
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  mainLayoutRoute.addChildren([
    dashboardRoute,
    usersRoute,
    aiContentRoute,
    socialMediaRoute,
    campaignsRoute,
    templatesRoute,
    analyticsRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
