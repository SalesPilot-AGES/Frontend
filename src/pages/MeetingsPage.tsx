import { AdminMeetingsManagement } from '@pages/admin/MeetingsManagement/AdminMeetingsManagement';
import { ManagerMeetingsManagement } from '@pages/manager/MeetingsManagement/ManagerMeetingsManagement';
import { SalesmanMeetingsManagement } from '@pages/salesman/MeetingsManagement/SalesmanMeetingsManagement';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const MeetingsPage = (): JSX.Element => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminMeetingsManagement />;
  if (role === 'manager') return <ManagerMeetingsManagement />;
  return <SalesmanMeetingsManagement />;
};
