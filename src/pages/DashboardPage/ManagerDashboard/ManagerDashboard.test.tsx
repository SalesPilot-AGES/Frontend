import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen, within } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@pages/DashboardPage/context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters: {
      period: 'custom',
      startDate: '2026-01-01',
      endDate: new Date().toISOString().split('T')[0],
    },
  }),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetDashboardMetrics: vi.fn(),
  useGetMeetingsBySalesman: vi.fn(),
  useGetMeetingsByMonth: vi.fn(),
  useGetSalesmenStatus: vi.fn(),
}));

vi.mock('@store/hooks/useDashboardAvgDuration', () => ({
  useDashboardAvgDuration: vi.fn(),
}));

import {
  useGetDashboardMetrics,
  useGetMeetingsByMonth,
  useGetMeetingsBySalesman,
  useGetSalesmenStatus,
} from '@services/queries/useDashboard';
import { useDashboardAvgDuration } from '@store/hooks/useDashboardAvgDuration';

import { ManagerDashboard } from './ManagerDashboard';

const mockUseGetDashboardMetrics = useGetDashboardMetrics as ReturnType<
  typeof vi.fn
>;
const mockUseGetMeetingsBySalesman = useGetMeetingsBySalesman as ReturnType<
  typeof vi.fn
>;
const mockUseGetMeetingsByMonth = useGetMeetingsByMonth as ReturnType<
  typeof vi.fn
>;
const mockUseGetSalesmenStatus = useGetSalesmenStatus as ReturnType<
  typeof vi.fn
>;
const mockUseDashboardAvgDuration = useDashboardAvgDuration as ReturnType<
  typeof vi.fn
>;

describe('ManagerDashboard', () => {
  beforeEach(() => {
    mockUseGetDashboardMetrics.mockReturnValue({
      data: {
        active_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        inactive_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        salesmen: {
          value: 8,
          variationPercentage: 12,
          trend: 'up',
        },
        total_meetings: {
          value: 42,
          variationPercentage: -5,
          trend: 'down',
        },
      },
      isError: false,
      isLoading: false,
    });
    mockUseGetMeetingsBySalesman.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    mockUseGetSalesmenStatus.mockReturnValue({
      data: { active: 8, inactive: 2 },
      isLoading: false,
      isError: false,
    });
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it('renders manager dashboard title', () => {
    render(<ManagerDashboard />);
    expect(screen.getByText(EPageTitles.MANAGER_DASHBOARD)).toBeInTheDocument();
  });

  it('renders manager metric cards', () => {
    render(<ManagerDashboard />);

    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-active-salesmen')
      ).getByText(ECardLabel.ACTIVE_SALESMAN)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-inactive-salesmen')
      ).getByText(ECardLabel.INACTIVE_SALESMAN)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-total-meetings')
      ).getByText(ECardLabel.TOTAL_MEETINGS)
    ).toBeInTheDocument();
  });
});
