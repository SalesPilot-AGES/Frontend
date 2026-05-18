import apiClient from '@services/api/apiClient';
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

export const mockAvgDurationData = [
  { month: '2024-01-01T00:00:00Z', month_label: 'Jan', avg_minutes: 38 },
  { month: '2024-02-01T00:00:00Z', month_label: 'Fev', avg_minutes: 41 },
  { month: '2024-03-01T00:00:00Z', month_label: 'Mar', avg_minutes: 39 },
  { month: '2024-04-01T00:00:00Z', month_label: 'Abr', avg_minutes: 42 },
  { month: '2024-05-01T00:00:00Z', month_label: 'Mai', avg_minutes: 40 },
  { month: '2024-06-01T00:00:00Z', month_label: 'Jun', avg_minutes: 43 },
];
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
  getAvgDuration: async (): Promise<TDashboardAvgDurationPoint[]> => {
    if (USE_MOCK_AVG_DURATION_DATA) {
      const parsedMockResponse = DashboardAvgDurationResponseSchema.parse({
        data: mockAvgDurationData,
      });
      return parsedMockResponse.data.map(mapAvgDurationPoint);
    }

    const response = await apiClient.get<unknown>(
      '/api/dashboard/avg-duration'
    );

    const parsedResponse = DashboardAvgDurationResponseSchema.parse(
      response.data
    );
    return parsedResponse.data.map(mapAvgDurationPoint);
  },
};
