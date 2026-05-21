import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdminDashboard } from './AdminDashboard';

vi.mock('@services/queries/useDashboard', () => ({
  useGetMeetingsByCompany: vi.fn(),
}));

import { useGetMeetingsByCompany } from '@services/queries/useDashboard';

const mockUseGetMeetingsByCompany = useGetMeetingsByCompany as ReturnType<
  typeof vi.fn
>;

describe('AdminDashboard', () => {
  beforeEach(() => {
    mockUseGetMeetingsByCompany.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });
  });

  it('renders admin dashboard title', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(EPageTitles.ADMIN_DASHBOARD)).toBeInTheDocument();
  });

  it('renders meetings by company chart title', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/reuniões por empresa/i)).toBeInTheDocument();
  });
});
