import { AdminMeetingsPage } from '@pages/MeetingsPage/AdminMeetingsPage/AdminMeetingsPage';
import { ManagerMeetingsPage } from '@pages/MeetingsPage/ManagerMeetingsPage/ManagerMeetingsPage';
import { SalesmanMeetingsPage } from '@pages/MeetingsPage/SalesmanMeetingsPage/SalesmanMeetingsPage';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type { JSX } from 'react';

export const MeetingsPage = (): JSX.Element => {
  const role = useCurrentUserRole();
  if (role === 'admin') return <AdminMeetingsPage />;
  if (role === 'manager') return <ManagerMeetingsPage />;
  return <SalesmanMeetingsPage />;
};
