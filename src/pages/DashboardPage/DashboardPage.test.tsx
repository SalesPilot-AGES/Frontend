import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { DashboardPage } from './DashboardPage';

vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUserRole: vi.fn(),
}));

vi.mock('./AdminDashboard/AdminDashboard', () => ({
  AdminDashboard: () => <div data-testid="admin-dashboard" />,
}));
vi.mock('./ManagerDashboard/ManagerDashboard', () => ({
  ManagerDashboard: () => <div data-testid="manager-dashboard" />,
}));
vi.mock('./SalesmanDashboard/SalesmanDashboard', () => ({
  SalesmanDashboard: () => <div data-testid="salesman-dashboard" />,
}));

import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
const mockRole = useCurrentUserRole as ReturnType<typeof vi.fn>;

describe('DashboardPage', () => {
  it('renders AdminDashboard for admin role', () => {
    mockRole.mockReturnValue('admin');
    render(<DashboardPage />);
    expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
  });

  it('renders ManagerDashboard for manager role', () => {
    mockRole.mockReturnValue('manager');
    render(<DashboardPage />);
    expect(screen.getByTestId('manager-dashboard')).toBeInTheDocument();
  });

  it('renders SalesmanDashboard for salesmen role', () => {
    mockRole.mockReturnValue('salesmen');
    render(<DashboardPage />);
    expect(screen.getByTestId('salesman-dashboard')).toBeInTheDocument();
  });
});
