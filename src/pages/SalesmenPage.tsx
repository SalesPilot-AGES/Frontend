import { AdminSalesmenManagement } from '@pages/admin/SalesmenManagement/AdminSalesmenManagement';
import { ManagerSalesmenManagement } from '@pages/manager/SalesmenManagement/ManagerSalesmenManagement';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const SalesmenPage = (): JSX.Element | null => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminSalesmenManagement />;
  if (role === 'manager') return <ManagerSalesmenManagement />;
  return null;
};
