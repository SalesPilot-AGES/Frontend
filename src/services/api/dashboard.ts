import { dashboardMeetingsByMonthMock } from '@data/mocks/DashboardMeetingsByMonth';
import { dashboardMetricsMock } from '@data/mocks/DashboardMetrics';
import {
  DashboardMetricsResponseSchema,
  MeetingsByMonthResponseSchema,
  type TDashboardMetrics,
  type TDashboardPeriodParams,
  type TMeetingsByMonth,
} from '@services/models/DashboardSchema';
import axios from 'axios';
import { ZodError } from 'zod';

import apiClient from './apiClient';

const isFallbackEnvironment = import.meta.env.MODE !== 'production';

const shouldUseMockFallback = (error: unknown): boolean => {
  if (!isFallbackEnvironment) {
    return false;
  }

  if (!axios.isAxiosError(error)) {
    return false;
  }

  const status = error.response?.status;

  if (status === 404 || status === 405) {
    return true;
  }

  return !error.response;
};

export const dashboardApi = {
  getMeetingsByMonth: async (
    period: TDashboardPeriodParams
  ): Promise<TMeetingsByMonth> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/dashboard/meetings-by-month',
        {
          params: {
            period: period.period,
            ...(period.period === 'custom' &&
              period.startDate && { start_date: period.startDate }),
            ...(period.period === 'custom' &&
              period.endDate && { end_date: period.endDate }),
          },
        }
      );

      return MeetingsByMonthResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError && isFallbackEnvironment) {
        return dashboardMeetingsByMonthMock;
      }

      if (shouldUseMockFallback(error)) {
        return dashboardMeetingsByMonthMock;
      }

      throw error;
    }
  },
  getMetrics: async (
    period: TDashboardPeriodParams
  ): Promise<TDashboardMetrics> => {
    try {
      const response = await apiClient.get<unknown>('/api/painel/metricas', {
        params: {
          period: period.period,
          ...(period.period === 'custom' &&
            period.startDate && { start_date: period.startDate }),
          ...(period.period === 'custom' &&
            period.endDate && { end_date: period.endDate }),
        },
      });

      return DashboardMetricsResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError && isFallbackEnvironment) {
        return dashboardMetricsMock;
      }

      if (shouldUseMockFallback(error)) {
        return dashboardMetricsMock;
      }

      throw error;
    }
  },
};
