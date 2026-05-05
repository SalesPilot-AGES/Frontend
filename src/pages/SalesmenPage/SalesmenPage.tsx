import { AdminSalesmenPage } from '@pages/SalesmenPage/AdminSalesmenPage/AdminSalesmenPage';
import { ManagerSalesmenPage } from '@pages/SalesmenPage/ManagerSalesmenPage/ManagerSalesmenPage';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const SalesmenPage = (): JSX.Element | null => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminSalesmenPage />;
  if (role === 'manager') return <ManagerSalesmenPage />;
  return null;
};
