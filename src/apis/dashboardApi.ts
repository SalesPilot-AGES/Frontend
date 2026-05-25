import { mockDashboardAvgDurationData } from '@data/mocks/DashboardAvgDuration';
import apiClient from '@services/api/apiClient';
import type { TDashboardPeriodParams } from '@services/models/DashboardSchema';
import { z } from 'zod';

const DashboardAvgDurationPointSchema = z.object({
  month: z.string(),
  month_label: z.string(),
  avg_minutes: z.number(),
});

const DashboardAvgDurationResponseSchema = z.object({
  data: z.array(DashboardAvgDurationPointSchema),
});

type TDashboardAvgDurationApiPoint = z.infer<
  typeof DashboardAvgDurationPointSchema
>;

export type TDashboardAvgDurationPoint = {
  month: string;
  monthLabel: string;
  avgMinutes: number;
};

const USE_MOCK_AVG_DURATION_DATA = import.meta.env.DEV;
// Mock temporario ate o backend disponibilizar GET /api/dashboard/avg-duration.

const mapAvgDurationPoint = (
  point: TDashboardAvgDurationApiPoint
): TDashboardAvgDurationPoint => {
  return {
    month: point.month,
    monthLabel: point.month_label,
    avgMinutes: point.avg_minutes,
  };
};

export const dashboardApi = {
  getAvgDuration: async (
    period: TDashboardPeriodParams
  ): Promise<TDashboardAvgDurationPoint[]> => {
    if (USE_MOCK_AVG_DURATION_DATA) {
      const parsedMockResponse = DashboardAvgDurationResponseSchema.parse({
        data: mockDashboardAvgDurationData,
      });
      return parsedMockResponse.data.map(mapAvgDurationPoint);
    }

    const response = await apiClient.get<unknown>(
      '/api/dashboard/avg-duration',
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

    const parsedResponse = DashboardAvgDurationResponseSchema.parse(
      response.data
    );
    return parsedResponse.data.map(mapAvgDurationPoint);
  },
};
