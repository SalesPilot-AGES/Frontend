import { ECardLabel } from '@data/enums/ECardLabel';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { DashboardMetricsCards } from './DashboardMetricsCards';

const { mockUseGetDashboardMetrics } = vi.hoisted(() => ({
  mockUseGetDashboardMetrics: vi.fn(),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetDashboardMetrics: mockUseGetDashboardMetrics,
}));

vi.mock('../../useDashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    period: {
      period: '90d',
    },
  }),
}));

describe('DashboardMetricsCards', () => {
  it('renders metrics in the expected order', () => {
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
        total_meetings: {
          value: 502,
          variationPercentage: 15,
          trend: 'up',
        },
        salesmen: {
          value: 76,
          variationPercentage: 8,
          trend: 'up',
        },
      },
      isLoading: false,
      isError: false,
    });

    render(<DashboardMetricsCards />);

    const cards = screen.getAllByTestId(/dashboard-metric-card-/);
    const cardIds = cards.map((card) => card.getAttribute('data-testid'));

    expect(cardIds).toEqual([
      'dashboard-metric-card-active_companies',
      'dashboard-metric-card-inactive_companies',
      'dashboard-metric-card-salesmen',
      'dashboard-metric-card-total_meetings',
    ]);

    expect(screen.getByText(ECardLabel.ACTIVE_COMPANIES)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.INACTIVE_COMPANIES)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.TOTAL_MEETINGS)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.SALESMAN)).toBeInTheDocument();
  });

  it('renders loading placeholders while metrics are loading', () => {
    mockUseGetDashboardMetrics.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<DashboardMetricsCards />);

    expect(
      screen.queryByTestId('dashboard-metric-card-active_companies')
    ).not.toBeInTheDocument();
  });
});
