import {
  mockMeetingsByCompany,
  mockMeetingsBySalesman,
} from '@data/mocks/Dashboard';
import { dashboardCompaniesStatusMock } from '@data/mocks/DashboardCompaniesStatus';
import { dashboardMeetingsByMonthMock } from '@data/mocks/DashboardMeetingsByMonth';
import { dashboardSalesmenStatusMock } from '@data/mocks/DashboardSalesmenStatus';
import {
  MeetingsByCompanySchema,
  MeetingsByMonthResponseSchema,
  MeetingsBySalesmanSchema,
  StatusCountResponseSchema,
  type TDashboardFilters,
  type TDashboardPeriodParams,
  type TDashboardStatusCount,
  type TMeetingsByCompany,
  type TMeetingsByMonth,
  type TMeetingsBySalesman,
} from '@services/models/DashboardSchema';
import axios from 'axios';

import apiClient from './apiClient';

const isFallbackEnvironment = import.meta.env.DEV;

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
    ...(filters.startDate ? { start_date: filters.startDate } : {}),
    ...(filters.endDate ? { end_date: filters.endDate } : {}),
  };
};

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
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return MeetingsByCompanySchema.parse(mockMeetingsByCompany);
      }

      throw error;
    }
  },

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
      if (shouldUseMockFallback(error)) {
        return dashboardMeetingsByMonthMock;
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
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return MeetingsBySalesmanSchema.parse(mockMeetingsBySalesman);
      }

      throw error;
    }
  },

  getCompaniesStatus: async (): Promise<TDashboardStatusCount> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/dashboard/companies-status'
      );

      return StatusCountResponseSchema.parse(response.data);
    } catch (error) {
      if (shouldUseMockFallback(error)) {
        return dashboardCompaniesStatusMock;
      }

      throw error;
    }
  },

  getSalesmenStatus: async (): Promise<TDashboardStatusCount> => {
    try {
      const response = await apiClient.get<unknown>(
        '/api/dashboard/salesmen-status'
      );

      return StatusCountResponseSchema.parse(response.data);
    } catch (error) {
      if (shouldUseMockFallback(error)) {
        return dashboardSalesmenStatusMock;
      }

      throw error;
    }
  },
};
