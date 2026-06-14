import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
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
  useGetMeetingsByMonth: vi.fn(),
}));

vi.mock('@store/hooks/useDashboardAvgDuration', () => ({
  useDashboardAvgDuration: vi.fn(),
}));

import {
  useGetDashboardMetrics,
  useGetMeetingsByMonth,
} from '@services/queries/useDashboard';
import { useDashboardAvgDuration } from '@store/hooks/useDashboardAvgDuration';

import { SalesmanDashboard } from './SalesmanDashboard';

const mockUseGetDashboardMetrics = useGetDashboardMetrics as ReturnType<
  typeof vi.fn
>;
const mockUseGetMeetingsByMonth = useGetMeetingsByMonth as ReturnType<
  typeof vi.fn
>;
const mockUseDashboardAvgDuration = useDashboardAvgDuration as ReturnType<
  typeof vi.fn
>;

describe('SalesmanDashboard', () => {
  beforeEach(() => {
    mockUseGetDashboardMetrics.mockReturnValue({
      data: {
        total_meetings: {
          value: 18,
          variationPercentage: 12,
          trend: 'up',
        },
        average_duration: {
          value: 2400,
          variationPercentage: 8,
          trend: 'up',
        },
      },
      isError: false,
      isLoading: false,
    });
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [],
      isLoading: false,
    });
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it('renders salesman dashboard title', () => {
    render(<SalesmanDashboard />);
    expect(
      screen.getByText(EPageTitles.SALESMAN_DASHBOARD)
    ).toBeInTheDocument();
  });

  it('renders salesman metric cards', () => {
    render(<SalesmanDashboard />);

    expect(
      screen.getByTestId('salesman-dashboard-metric-card-total_meetings')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('salesman-dashboard-metric-card-average_duration')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('salesman-dashboard-metric-card-average_sentiment')
    ).toBeInTheDocument();

    expect(screen.getByText(ECardLabel.AVERAGE_DURATION)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.AVERAGE_FEELING)).toBeInTheDocument();
    expect(screen.getByText('40 min')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
  });
});
