import { dashboardApi } from '@services/api/dashboard';
import type {
  TDashboardFilters,
  TDashboardPeriodParams,
  TDashboardStatusCount,
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
  meetingsByMonth: (period: TDashboardPeriodParams) =>
    [...dashboardQueryKeys.all, 'meetings-by-month', period] as const,
  meetingsBySalesman: (filters?: TDashboardFilters) =>
    [...dashboardQueryKeys.all, 'meetings-by-salesman', filters] as const,
  companiesStatus: [...dashboardQueryKeys.all, 'companies-status'] as const,
  salesmenStatus: [...dashboardQueryKeys.all, 'salesmen-status'] as const,
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
  period: TDashboardPeriodParams
): ReturnType<typeof useQuery<TMeetingsByMonth, Error>> =>
  useQuery<TMeetingsByMonth, Error>({
    queryKey: dashboardQueryKeys.meetingsByMonth(period),
    queryFn: () => dashboardApi.getMeetingsByMonth(period),
    staleTime: 0,
  });

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

export const useGetCompaniesStatus = (): ReturnType<
  typeof useQuery<TDashboardStatusCount, Error>
> =>
  useQuery<TDashboardStatusCount, Error>({
    queryKey: dashboardQueryKeys.companiesStatus,
    queryFn: () => dashboardApi.getCompaniesStatus(),
    staleTime: 0,
  });

export const useGetSalesmenStatus = (): ReturnType<
  typeof useQuery<TDashboardStatusCount, Error>
> =>
  useQuery<TDashboardStatusCount, Error>({
    queryKey: dashboardQueryKeys.salesmenStatus,
    queryFn: () => dashboardApi.getSalesmenStatus(),
    staleTime: 0,
  });
