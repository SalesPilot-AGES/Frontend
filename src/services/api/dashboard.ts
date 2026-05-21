import { mockMeetingsByCompany } from '@data/mocks/Dashboard';
import {
  MeetingsByCompanySchema,
  type TDashboardFilters,
  type TMeetingsByCompany,
} from '@services/models/DashboardSchema';
import axios from 'axios';

import apiClient from './apiClient';

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
};
