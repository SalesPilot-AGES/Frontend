import { dashboardApi } from '@services/api/dashboard';
import type {
  TDashboardFilters,
  TMeetingsByCompany,
} from '@services/models/DashboardSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  meetingsByCompany: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'meetings-by-company', filters] as const,
};

export const useGetMeetingsByCompany = (
  filters?: TDashboardFilters,
  options?: UseQueryOptions<TMeetingsByCompany>
): ReturnType<typeof useQuery<TMeetingsByCompany, Error>> => {
  return useQuery<TMeetingsByCompany, Error>({
    queryKey: dashboardQueryKeys.meetingsByCompany(filters),
    queryFn: () => dashboardApi.getMeetingsByCompany(filters),
    staleTime: 0,
    ...options,
  });
};
