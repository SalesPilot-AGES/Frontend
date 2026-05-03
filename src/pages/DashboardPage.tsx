import { AdminDashboard } from '@pages/admin/Dashboard/AdminDashboard';
import { ManagerDashboard } from '@pages/manager/Dashboard/ManagerDashboard';
import { SalesmanDashboard } from '@pages/salesman/Dashboard/SalesmanDashboard';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const DashboardPage = (): JSX.Element => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'manager') return <ManagerDashboard />;
  return <SalesmanDashboard />;
};
