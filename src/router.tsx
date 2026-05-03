import { EPageRoutes } from '@data/enums/EPageRoutes';
import { AdminCompaniesManagement } from '@pages/admin/CompaniesManagement/AdminCompaniesManagement';
import { CompanyDetail } from '@pages/admin/CompaniesManagement/CompanyDetail/AdminCompaniesDetails';
// import { AdminMeetingDetails } from '@pages/admin/MeetingsManagement/AdminMeetingDetails';
import { AdminManagersDetails } from '@pages/admin/ManagersManagement/AdminManagersDetails';
import { AdminManagersManagement } from '@pages/admin/ManagersManagement/AdminManagersManagement';
import { DashboardPage } from '@pages/DashboardPage';
import { Layout } from '@pages/Layout';
import { Login } from '@pages/Login/Login';
import { MeetingsPage } from '@pages/MeetingsPage';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { RootComponent } from '@pages/RootComponent';
import { SalesmenPage } from '@pages/SalesmenPage';
import { useAuthStore } from '@store/authStore';
import {
  createRootRoute,
  createRoute,
  redirect,
  Router,
} from '@tanstack/react-router';

const requireAuth = (): void => {
  const user = useAuthStore.getState().user;
  if (!user) throw redirect({ to: EPageRoutes.LOGIN });
};

const requireAdmin = (): void => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'admin') throw redirect({ to: EPageRoutes.DASHBOARD });
};

const requireAdminOrManager = (): void => {
  const user = useAuthStore.getState().user;
  if (user?.role === 'salesmen') throw redirect({ to: EPageRoutes.DASHBOARD });
};

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: PageNotFound,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: EPageRoutes.LOGIN,
  component: Login,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    throw redirect({ to: user ? EPageRoutes.DASHBOARD : EPageRoutes.LOGIN });
  },
});

// Layout route — no URL segment, wraps all authenticated pages
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: Layout,
  beforeLoad: requireAuth,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: EPageRoutes.DASHBOARD,
  component: DashboardPage,
});

// Admin-only group — no URL segment, adds role guard
const adminGroupRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: 'admin',
  beforeLoad: requireAdmin,
});

const companiesRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.COMPANIES,
  component: AdminCompaniesManagement,
});

const companyDetailRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.COMPANY_DETAIL,
  component: CompanyDetail,
});

const managersRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.MANAGERS,
  component: AdminManagersManagement,
});

const managerDetailRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.MANAGER_DETAIL,
  component: AdminManagersDetails,
});

const salesmenRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: EPageRoutes.SALESMEN,
  component: SalesmenPage,
  beforeLoad: requireAdminOrManager,
});

const meetingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: EPageRoutes.MEETINGS,
  component: MeetingsPage,
});

// const meetingDetailRoute = createRoute({
//   getParentRoute: () => protectedRoute,
//   path: EPageRoutes.MEETING_DETAIL,
//   component: AdminMeetingDetails,
// });

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    adminGroupRoute.addChildren([
      companiesRoute,
      companyDetailRoute,
      managersRoute,
      managerDetailRoute,
      // meetingDetailRoute,
    ]),
    salesmenRoute,
    meetingsRoute,
  ]),
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
