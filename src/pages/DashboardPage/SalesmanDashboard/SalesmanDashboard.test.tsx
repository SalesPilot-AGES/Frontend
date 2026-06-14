import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen, within } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { filters } = vi.hoisted(() => ({
  filters: {
    period: 'custom' as const,
    startDate: '2026-01-01',
    endDate: '2026-06-14',
  },
}));

vi.mock('@pages/DashboardPage/context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters,
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
    mockUseGetDashboardMetrics.mockReset();
    mockUseGetMeetingsByMonth.mockReset();
    mockUseDashboardAvgDuration.mockReset();

    mockUseGetDashboardMetrics.mockReturnValue({
      data: {
        active_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        average_duration: {
          value: 2400,
          variationPercentage: 5,
          trend: 'up',
        },
        inactive_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        salesmen: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        total_meetings: {
          value: 15,
          variationPercentage: 10,
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
      isError: false,
      isLoading: false,
    });
  });

  it('renders salesman dashboard title', () => {
    render(<SalesmanDashboard />);
    expect(
      screen.getByText(EPageTitles.SALESMAN_DASHBOARD)
    ).toBeInTheDocument();
  });

  it('renders salesman stat cards', () => {
    render(<SalesmanDashboard />);

    const totalMeetingsCard = within(
      screen.getByTestId('dashboard-metric-card-total_meetings')
    );
    const averageDurationCard = within(
      screen.getByTestId('dashboard-metric-card-average_duration')
    );
    const averageSentimentCard = within(
      screen.getByTestId('dashboard-metric-card-average_sentiment')
    );

    expect(totalMeetingsCard.getByText('15')).toBeInTheDocument();
    expect(
      totalMeetingsCard.getByText(ECardLabel.TOTAL_MEETINGS)
    ).toBeInTheDocument();
    expect(averageDurationCard.getByText('40 min')).toBeInTheDocument();
    expect(
      averageDurationCard.getByText(ECardLabel.AVERAGE_DURATION)
    ).toBeInTheDocument();
    expect(averageSentimentCard.getByText('90%')).toBeInTheDocument();
    expect(
      averageSentimentCard.getByText(ECardLabel.AVERAGE_FEELING)
    ).toBeInTheDocument();
  });

  it('passes dashboard filters to metrics query', () => {
    render(<SalesmanDashboard />);

    expect(mockUseGetDashboardMetrics).toHaveBeenCalledWith(filters);
  });
});
