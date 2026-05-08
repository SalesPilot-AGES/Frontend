import { AdminDashboard } from '@pages/DashboardPage/AdminDashboard/AdminDashboard';
import { ManagerDashboard } from '@pages/DashboardPage/ManagerDashboard/ManagerDashboard';
import { SalesmanDashboard } from '@pages/DashboardPage/SalesmanDashboard/SalesmanDashboard';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const DashboardPage = (): JSX.Element => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'manager') return <ManagerDashboard />;
  return <SalesmanDashboard />;
};
