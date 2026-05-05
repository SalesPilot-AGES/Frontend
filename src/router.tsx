import { EPageRoutes } from '@data/enums/EPageRoutes';
import { CompaniesPage } from '@pages/CompaniesPage/CompaniesPage';
import { CompanyDetail } from '@pages/CompaniesPage/CompanyDetail/CompanyDetail';
import { DashboardPage } from '@pages/DashboardPage/DashboardPage';
import { Layout } from '@pages/Layout/Layout';
import { Login } from '@pages/Login/Login';
import { ManagersDetails } from '@pages/ManagersPage/ManagersDetails/ManagersDetails';
import { ManagersPage } from '@pages/ManagersPage/ManagersPage';
import { MeetingsPage } from '@pages/MeetingsPage/MeetingsPage';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { RootComponent } from '@pages/RootComponent/RootComponent';
import { SalesmenPage } from '@pages/SalesmenPage/SalesmenPage';
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

const adminGroupRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: 'admin',
  beforeLoad: requireAdmin,
});

const companiesRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.COMPANIES,
  component: CompaniesPage,
});

const companyDetailRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.COMPANY_DETAIL,
  component: CompanyDetail,
});

const managersRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.MANAGERS,
  component: ManagersPage,
});

const managerDetailRoute = createRoute({
  getParentRoute: () => adminGroupRoute,
  path: EPageRoutes.MANAGER_DETAIL,
  component: ManagersDetails,
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
