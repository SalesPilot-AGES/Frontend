import { dashboardApi } from '@services/api/dashboard';
import type {
  TDashboardMetrics,
  TDashboardPeriodParams,
  TMeetingsByMonth,
} from '@services/models/DashboardSchema';
import { useQuery } from '@tanstack/react-query';

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  meetingsByMonth: (period: TDashboardPeriodParams) =>
    [...dashboardQueryKeys.all, 'meetings-by-month', period] as const,
  metrics: (period: TDashboardPeriodParams) =>
    [...dashboardQueryKeys.all, 'metrics', period] as const,
};

export const useGetMeetingsByMonth = (
  period: TDashboardPeriodParams
): ReturnType<typeof useQuery<TMeetingsByMonth, Error>> =>
  useQuery<TMeetingsByMonth, Error>({
    queryKey: dashboardQueryKeys.meetingsByMonth(period),
    queryFn: () => dashboardApi.getMeetingsByMonth(period),
    staleTime: 0,
  });

export const useGetDashboardMetrics = (
  period: TDashboardPeriodParams
): ReturnType<typeof useQuery<TDashboardMetrics, Error>> =>
  useQuery<TDashboardMetrics, Error>({
    queryKey: dashboardQueryKeys.metrics(period),
    queryFn: () => dashboardApi.getMetrics(period),
    staleTime: 0,
  });
