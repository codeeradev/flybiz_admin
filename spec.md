# FlyBiz Admin Panel

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full React + Vite (JSX) frontend SaaS admin panel for FlyBiz AI platform
- Authentication: Login page, mock users with 3 roles (Admin, Manager, Moderator), localStorage auth via Context API
- 8 pages: Dashboard, Users, AI Content, Social Media, Campaigns, Templates, Analytics, Settings
- Main layout: collapsible Sidebar + top Navbar
- Dark/light mode via ThemeContext stored in localStorage
- Reusable component library: Cards, Tables, Charts, Modals, Buttons, Skeleton loaders, Toast
- All mock data in mockData/ directory
- Placeholder service files in services/
- Utility functions in utils/
- Recharts for all analytics/charts
- Framer Motion for animations and hover effects
- Gradient buttons (blue→purple→pink)
- Fully responsive layout

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Set up folder structure: components, layouts, pages, context, hooks, mockData, services, utils
2. Create mock data files: users.js, aiContent.js, campaigns.js, socialMedia.js, templates.js, analytics.js
3. Create service placeholder files with commented fetch stubs
4. Build AuthContext (localStorage), ThemeContext (localStorage)
5. Build hooks: useAuth, useTheme, useToast
6. Build reusable components: GradientButton, StatCard, DataTable, Chart wrappers, SkeletonLoader, Toast, Modal
7. Build layouts: AuthLayout, MainLayout (Sidebar + Navbar)
8. Build all 9 pages (Login + 8 dashboard pages)
9. Set up React Router with role-based route guards
10. Wire Recharts charts on Dashboard and Analytics pages
11. Apply Framer Motion animations throughout
12. Ensure full responsive behavior
