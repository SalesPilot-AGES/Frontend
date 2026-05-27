import { dashboardApi } from '@services/api/dashboard';
import type {
  TDashboardAvgDurationPoint,
  TDashboardFilters,
} from '@services/models/DashboardSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const dashboardAvgDurationQueryKeys = {
  all: ['dashboard-avg-duration'] as const,
  byPeriod: (filters?: TDashboardFilters) =>
    [...dashboardAvgDurationQueryKeys.all, filters] as const,
};

export const useDashboardAvgDuration = (
  filters?: TDashboardFilters,
  options?: UseQueryOptions<TDashboardAvgDurationPoint[]>
): ReturnType<typeof useQuery<TDashboardAvgDurationPoint[], Error>> => {
  return useQuery<TDashboardAvgDurationPoint[], Error>({
    queryKey: dashboardAvgDurationQueryKeys.byPeriod(filters),
    queryFn: () => dashboardApi.getAvgDuration(filters),
    staleTime: 0,
    ...options,
  });
};
