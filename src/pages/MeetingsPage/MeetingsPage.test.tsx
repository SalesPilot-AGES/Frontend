import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { MeetingsPage } from './MeetingsPage';

vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUserRole: vi.fn(),
}));
vi.mock('./AdminMeetingsPage/AdminMeetingsPage', () => ({
  AdminMeetingsPage: () => <div data-testid="admin-meetings" />,
}));
vi.mock('./ManagerMeetingsPage/ManagerMeetingsPage', () => ({
  ManagerMeetingsPage: () => <div data-testid="manager-meetings" />,
}));
vi.mock('./SalesmanMeetingsPage/SalesmanMeetingsPage', () => ({
  SalesmanMeetingsPage: () => <div data-testid="salesman-meetings" />,
}));

import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
const mockRole = useCurrentUserRole as ReturnType<typeof vi.fn>;

describe('MeetingsPage', () => {
  it('renders AdminMeetingsPage for admin', () => {
    mockRole.mockReturnValue('admin');
    render(<MeetingsPage />);
    expect(screen.getByTestId('admin-meetings')).toBeInTheDocument();
  });

  it('renders ManagerMeetingsPage for manager', () => {
    mockRole.mockReturnValue('manager');
    render(<MeetingsPage />);
    expect(screen.getByTestId('manager-meetings')).toBeInTheDocument();
  });

  it('renders SalesmanMeetingsPage for salesmen', () => {
    mockRole.mockReturnValue('salesmen');
    render(<MeetingsPage />);
    expect(screen.getByTestId('salesman-meetings')).toBeInTheDocument();
  });
});
