import type { TDashboardPeriodParams } from '@services/models/DashboardSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import {
  dashboardApi,
  type TDashboardAvgDurationPoint,
} from '../../apis/dashboardApi';

export const dashboardAvgDurationQueryKeys = {
  all: ['dashboard-avg-duration'] as const,
  byPeriod: (period: TDashboardPeriodParams) =>
    [...dashboardAvgDurationQueryKeys.all, period] as const,
};

export const useDashboardAvgDuration = (
  period: TDashboardPeriodParams,
  options?: UseQueryOptions<TDashboardAvgDurationPoint[]>
): ReturnType<typeof useQuery<TDashboardAvgDurationPoint[], Error>> => {
  return useQuery<TDashboardAvgDurationPoint[], Error>({
    queryKey: dashboardAvgDurationQueryKeys.byPeriod(period),
    queryFn: () => dashboardApi.getAvgDuration(period),
    staleTime: 0,
    ...options,
  });
};
