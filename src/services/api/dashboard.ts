import {
  mockMeetingsByCompany,
  mockMeetingsBySalesman,
} from '@data/mocks/Dashboard';
import { mockDashboardAvgDurationData } from '@data/mocks/DashboardAvgDuration';
import { dashboardMeetingsByMonthMock } from '@data/mocks/DashboardMeetingsByMonth';
import { dashboardMetricsMock } from '@data/mocks/DashboardMetrics';
import {
  DashboardAvgDurationResponseSchema,
  DashboardMetricsResponseSchema,
  MeetingsByCompanySchema,
  MeetingsByMonthResponseSchema,
  MeetingsBySalesmanSchema,
  type TDashboardAvgDurationApiPoint,
  type TDashboardAvgDurationPoint,
  type TDashboardFilters,
  type TDashboardMetrics,
  type TMeetingsByCompany,
  type TMeetingsByMonth,
  type TMeetingsBySalesman,
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

const getDashboardPeriodParams = (
  filters?: TDashboardFilters
): Record<string, string> => {
  if (!filters) {
    return {};
  }

  return {
    period: filters.period,
    ...(filters.period === 'custom' &&
      filters.startDate && { start_date: filters.startDate }),
    ...(filters.period === 'custom' &&
      filters.endDate && { end_date: filters.endDate }),
  };
};

const mapAvgDurationPoint = (
  point: TDashboardAvgDurationApiPoint
): TDashboardAvgDurationPoint => ({
  month: point.month,
  monthLabel: point.month_label,
  avgMinutes: point.avg_minutes,
});

export const dashboardApi = {
  getMeetingsByCompany: async (
    filters?: TDashboardFilters
  ): Promise<TMeetingsByCompany> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/painel/reunioes-por-empresa',
        {
          params: getDashboardPeriodParams(filters),
        }
      );

      return MeetingsByCompanySchema.parse(response.data);
    } catch (error) {
      if (shouldUseMockFallback(error)) {
        return MeetingsByCompanySchema.parse(mockMeetingsByCompany);
      }

      throw error;
    }
  },

  getMeetingsByMonth: async (
    filters?: TDashboardFilters
  ): Promise<TMeetingsByMonth> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/dashboard/meetings-by-month',
        {
          params: getDashboardPeriodParams(filters),
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
    filters?: TDashboardFilters
  ): Promise<TDashboardMetrics> => {
    try {
      const response = await apiClient.get<unknown>('/api/painel/metricas', {
        params: getDashboardPeriodParams(filters),
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

  getMeetingsBySalesman: async (
    filters?: TDashboardFilters
  ): Promise<TMeetingsBySalesman> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/painel/reunioes-por-vendedor',
        {
          params: getDashboardPeriodParams(filters),
        }
      );

      return MeetingsBySalesmanSchema.parse(response.data);
    } catch (error) {
      if (shouldUseMockFallback(error)) {
        return MeetingsBySalesmanSchema.parse(mockMeetingsBySalesman);
      }

      throw error;
    }
  },

  getAvgDuration: async (
    filters?: TDashboardFilters
  ): Promise<TDashboardAvgDurationPoint[]> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/dashboard/avg-duration',
        {
          params: getDashboardPeriodParams(filters),
        }
      );

      const parsedResponse = DashboardAvgDurationResponseSchema.parse(
        response.data
      );
      return parsedResponse.data.map(mapAvgDurationPoint);
    } catch (error) {
      if (shouldUseMockFallback(error)) {
        const parsedMockResponse = DashboardAvgDurationResponseSchema.parse({
          data: mockDashboardAvgDurationData,
        });
        return parsedMockResponse.data.map(mapAvgDurationPoint);
      }

      throw error;
    }
  },
};
