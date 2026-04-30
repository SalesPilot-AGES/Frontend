import { EPageRoutes } from '@data/enums/EPageRoutes';
import { AdminCompaniesManagement } from '@pages/admin/CompaniesManagement/AdminCompaniesManagement';
import { CompanyDetail } from '@pages/admin/CompaniesManagement/CompanyDetail/CompanyDetail';
import { AdminDashboard } from '@pages/admin/Dashboard/AdminDashboard';
import { AdminManagersDetails } from '@pages/admin/ManagersManagement/AdminManagersDetails';
import { AdminManagersManagement } from '@pages/admin/ManagersManagement/AdminManagersManagement';
import { AdminMeetingsManagement } from '@pages/admin/MeetingsManagement/AdminMeetingsManagement';
import { AdminSalesmenManagement } from '@pages/admin/SalesmenManagement/AdminSalesmenManagement';
import { Login } from '@pages/Login/Login';
import { ManagerDashboard } from '@pages/manager/Dashboard/ManagerDashboard';
import { ManagerMeetingsManagement } from '@pages/manager/MeetingsManagement/ManagerMeetingsManagement';
import { ManagerSalesmenManagement } from '@pages/manager/SalesmenManagement/ManagerSalesmenManagement';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { RootComponent } from '@pages/RootComponent';
import { SalesmanDashboard } from '@pages/salesman/Dashboard/SalesmanDashboard';
import { SalesmanMeetingsManagement } from '@pages/salesman/MeetingsManagement/SalesmanMeetingsManagement';
import { createRootRoute, createRoute, Router } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: PageNotFound,
});

// Login route (no layout)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.LOGIN,
  component: Login,
});

// Admin Routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_DASHBOARD,
  component: AdminDashboard,
});

const companiesManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_COMPANIES,
  component: AdminCompaniesManagement,
});

const companyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_COMPANY_DETAIL,
  component: CompanyDetail,
});

const managersManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_MANAGERS,
  component: AdminManagersManagement,
});

const managerDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_MANAGERS_DETAILS,
  component: AdminManagersDetails,
});

const adminSalesmenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_SALESMEN,
  component: AdminSalesmenManagement,
});

const adminMeetingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_MEETINGS,
  component: AdminMeetingsManagement,
});

const adminMeetingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.ADMIN_MEETING_DETAIL,
  component: PageNotFound,
});

// Manager Routes
const managerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.MANAGER_DASHBOARD,
  component: ManagerDashboard,
});

const managerSalesmenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.MANAGER_SALESMEN,
  component: ManagerSalesmenManagement,
});

const managerMeetingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.MANAGER_MEETINGS,
  component: ManagerMeetingsManagement,
});

// Salesmen Routes
const salesmenDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.SALESMAN_DASHBOARD,
  component: SalesmanDashboard,
});

const salesmenMeetingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.SALESMAN_MEETINGS,
  component: SalesmanMeetingsManagement,
});

// Create route tree with all routes
const routeTree = rootRoute.addChildren([
  loginRoute,
  // Admin Routes
  adminDashboardRoute,
  companiesManagementRoute,
  companyDetailRoute,
  managersManagementRoute,
  managerDetailsRoute,
  adminSalesmenRoute,
  adminMeetingsRoute,
  adminMeetingDetailRoute,
  // Manager Routes
  managerDashboardRoute,
  managerSalesmenRoute,
  managerMeetingsRoute,
  // Salesmen Routes
  salesmenDashboardRoute,
  salesmenMeetingsRoute,
]);

export const router = new Router({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
