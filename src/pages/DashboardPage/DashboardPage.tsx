import { AdminDashboard } from '@pages/DashboardPage/AdminDashboard/AdminDashboard';
import { ManagerDashboard } from '@pages/DashboardPage/ManagerDashboard/ManagerDashboard';
import { SalesmanDashboard } from '@pages/DashboardPage/SalesmanDashboard/SalesmanDashboard';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

import { DashboardFilterProvider } from './DashboardFilterProvider';

export const DashboardPage = (): JSX.Element => {
  const role = useCurrentUserRole();

  if (role === 'admin')
    return (
      <DashboardFilterProvider>
        <AdminDashboard />
      </DashboardFilterProvider>
    );
  if (role === 'manager')
    return (
      <DashboardFilterProvider>
        <ManagerDashboard />
      </DashboardFilterProvider>
    );
  return (
    <DashboardFilterProvider>
      <SalesmanDashboard />
    </DashboardFilterProvider>
  );
};
