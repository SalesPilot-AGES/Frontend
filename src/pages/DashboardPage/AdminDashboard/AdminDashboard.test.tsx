import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdminDashboard } from './AdminDashboard';

vi.mock('@services/queries/useDashboard', () => ({
  useGetDashboardMetrics: vi.fn(),
  useGetMeetingsByCompany: vi.fn(),
  useGetMeetingsByMonth: vi.fn(),
}));

vi.mock('@pages/DashboardPage/context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters: {
      period: '30d',
    },
  }),
}));

import {
  useGetDashboardMetrics,
  useGetMeetingsByCompany,
  useGetMeetingsByMonth,
} from '@services/queries/useDashboard';

const mockUseGetDashboardMetrics = useGetDashboardMetrics as ReturnType<
  typeof vi.fn
>;
const mockUseGetMeetingsByCompany = useGetMeetingsByCompany as ReturnType<
  typeof vi.fn
>;
const mockUseGetMeetingsByMonth = useGetMeetingsByMonth as ReturnType<
  typeof vi.fn
>;

describe('AdminDashboard', () => {
  beforeEach(() => {
    mockUseGetDashboardMetrics.mockReturnValue({
      data: {
        active_companies: {
          value: 4,
          variationPercentage: 12,
          trend: 'up',
        },
        inactive_companies: {
          value: 1,
          variationPercentage: -25,
          trend: 'down',
        },
        salesmen: {
          value: 76,
          variationPercentage: 8,
          trend: 'up',
        },
        total_meetings: {
          value: 502,
          variationPercentage: 15,
          trend: 'up',
        },
      },
      isError: false,
      isLoading: false,
    });
    mockUseGetMeetingsByCompany.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [],
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
