import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { SalesmenPage } from './SalesmenPage';

vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUserRole: vi.fn(),
}));
vi.mock('./AdminSalesmenPage/AdminSalesmenPage', () => ({
  AdminSalesmenPage: () => <div data-testid="admin-salesmen" />,
}));
vi.mock('./ManagerSalesmenPage/ManagerSalesmenPage', () => ({
  ManagerSalesmenPage: () => <div data-testid="manager-salesmen" />,
}));

import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
const mockRole = useCurrentUserRole as ReturnType<typeof vi.fn>;

describe('SalesmenPage', () => {
  it('renders AdminSalesmenPage for admin', () => {
    mockRole.mockReturnValue('admin');
    render(<SalesmenPage />);
    expect(screen.getByTestId('admin-salesmen')).toBeInTheDocument();
  });

  it('renders ManagerSalesmenPage for manager', () => {
    mockRole.mockReturnValue('manager');
    render(<SalesmenPage />);
    expect(screen.getByTestId('manager-salesmen')).toBeInTheDocument();
  });

  it('renders nothing for salesmen role', () => {
    mockRole.mockReturnValue('salesmen');
    const { container } = render(<SalesmenPage />);
    expect(container.firstChild).toBeNull();
  });
});
