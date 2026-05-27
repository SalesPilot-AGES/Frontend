import { AdminDashboard } from '@pages/DashboardPage/AdminDashboard/AdminDashboard';
import { ManagerDashboard } from '@pages/DashboardPage/ManagerDashboard/ManagerDashboard';
import { SalesmanDashboard } from '@pages/DashboardPage/SalesmanDashboard/SalesmanDashboard';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

import { DashboardFilterProvider } from './context/DashboardFilterProvider';

export const DashboardPage = (): JSX.Element => {
  const role = useCurrentUserRole();

  return (
    <DashboardFilterProvider>
      {role === 'admin' ? (
        <AdminDashboard />
      ) : role === 'manager' ? (
        <ManagerDashboard />
      ) : (
        <SalesmanDashboard />
      )}
    </DashboardFilterProvider>
  );
};
