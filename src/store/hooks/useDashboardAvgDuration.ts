import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import {
  dashboardApi,
  type TDashboardAvgDurationPoint,
} from '../../apis/dashboardApi';

export const dashboardAvgDurationQueryKeys = {
  all: ['dashboard-avg-duration'] as const,
};

export const useDashboardAvgDuration = (
  options?: UseQueryOptions<TDashboardAvgDurationPoint[]>
): ReturnType<typeof useQuery<TDashboardAvgDurationPoint[], Error>> => {
  return useQuery<TDashboardAvgDurationPoint[], Error>({
    queryKey: dashboardAvgDurationQueryKeys.all,
    queryFn: () => dashboardApi.getAvgDuration(),
    staleTime: 0,
    ...options,
  });
};
