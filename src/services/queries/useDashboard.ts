import { dashboardApi } from '@services/api/dashboard';
import type {
  TDashboardFilters,
  TDashboardMetrics,
  TMeetingsByCompany,
  TMeetingsByMonth,
  TMeetingsBySalesman,
} from '@services/models/DashboardSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  meetingsByCompany: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'meetings-by-company', filters] as const,
  meetingsByMonth: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'meetings-by-month', filters] as const,
  metrics: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'metrics', filters] as const,
  meetingsBySalesman: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'meetings-by-salesman', filters] as const,
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

export const useGetMeetingsByMonth = (
  filters?: TDashboardFilters,
  options?: UseQueryOptions<TMeetingsByMonth>
): ReturnType<typeof useQuery<TMeetingsByMonth, Error>> => {
  return useQuery<TMeetingsByMonth, Error>({
    queryKey: dashboardQueryKeys.meetingsByMonth(filters),
    queryFn: () => dashboardApi.getMeetingsByMonth(filters),
    staleTime: 0,
    ...options,
  });
};

export const useGetDashboardMetrics = (
  filters?: TDashboardFilters,
  options?: UseQueryOptions<TDashboardMetrics>
): ReturnType<typeof useQuery<TDashboardMetrics, Error>> => {
  return useQuery<TDashboardMetrics, Error>({
    queryKey: dashboardQueryKeys.metrics(filters),
    queryFn: () => dashboardApi.getMetrics(filters),
    staleTime: 0,
    ...options,
  });
};

export const useGetMeetingsBySalesman = (
  filters?: TDashboardFilters,
  options?: UseQueryOptions<TMeetingsBySalesman>
): ReturnType<typeof useQuery<TMeetingsBySalesman, Error>> => {
  return useQuery<TMeetingsBySalesman, Error>({
    queryKey: dashboardQueryKeys.meetingsBySalesman(filters),
    queryFn: () => dashboardApi.getMeetingsBySalesman(filters),
    staleTime: 0,
    ...options,
  });
};
