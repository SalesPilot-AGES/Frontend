import type { TDashboardMetrics } from '@services/models/DashboardSchema';

export const dashboardMetricsMock: TDashboardMetrics = {
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
};
