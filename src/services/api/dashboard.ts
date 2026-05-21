import { meetingsByMonthMock } from '@data/mocks/MeetingsByMonth';
import {
  MeetingsByMonthResponseSchema,
  type TMeetingsByMonth,
} from '@services/models/DashboardSchema';
import axios from 'axios';

import apiClient from './apiClient';

export type TDashboardPeriodParams = {
  period: '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
};

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
      if (shouldUseMockFallback(error)) {
        return meetingsByMonthMock;
      }

      throw error;
    }
  },
};
