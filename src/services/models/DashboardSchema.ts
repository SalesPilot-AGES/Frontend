import { z } from 'zod';

export type TDashboardPeriodParams = {
  period: 'all' | '7d' | '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
};

export const DashboardMetricTrendSchema = z.enum(['up', 'down', 'neutral']);

export const DashboardMetricKeySchema = z.enum([
  'active_companies',
  'inactive_companies',
  'total_meetings',
  'salesmen',
]);

export type TDashboardMetricTrend = z.infer<typeof DashboardMetricTrendSchema>;
export type TDashboardMetricKey = z.infer<typeof DashboardMetricKeySchema>;

const DashboardMetricApiSchema = z
  .object({
    value: z.number().optional(),
    total: z.number().optional(),
    count: z.number().optional(),
    variation: z.number().optional(),
    variation_pct: z.number().optional(),
    variationPct: z.number().optional(),
    percentage: z.number().optional(),
    trend: DashboardMetricTrendSchema.optional(),
  })
  .transform((metric) => {
    const variationPercentage =
      metric.variation ??
      metric.variation_pct ??
      metric.variationPct ??
      metric.percentage ??
      0;

    const trend =
      metric.trend ??
      (variationPercentage > 0
        ? 'up'
        : variationPercentage < 0
          ? 'down'
          : 'neutral');

    return {
      value: metric.value ?? metric.total ?? metric.count ?? 0,
      variationPercentage,
      trend,
    };
  });

export const DashboardMetricsResponseSchema = z
  .object({
    data: z.object({
      active_companies: DashboardMetricApiSchema,
      inactive_companies: DashboardMetricApiSchema,
      total_meetings: DashboardMetricApiSchema,
      salesmen: DashboardMetricApiSchema,
    }),
  })
  .transform((response) => response.data);

export const DashboardMetricsSchema = z.object({
  active_companies: DashboardMetricApiSchema,
  inactive_companies: DashboardMetricApiSchema,
  total_meetings: DashboardMetricApiSchema,
  salesmen: DashboardMetricApiSchema,
});

export type TDashboardMetric = z.infer<typeof DashboardMetricApiSchema>;
export type TDashboardMetrics = z.infer<typeof DashboardMetricsSchema>;

const MeetingsByMonthApiItemSchema = z
  .object({
    monthLabel: z.string().optional(),
    month_label: z.string().optional(),
    month: z.string().optional(),
    total: z.number().optional(),
    totalMeetings: z.number().optional(),
    total_meetings: z.number().optional(),
  })
  .transform((item) => ({
    month: item.month ?? '',
    monthLabel: item.monthLabel ?? item.month_label ?? '',
    total: item.total ?? item.totalMeetings ?? item.total_meetings ?? 0,
  }));

export const MeetingsByMonthResponseSchema = z
  .object({
    data: z.array(MeetingsByMonthApiItemSchema),
  })
  .transform((response) => response.data);

export const MeetingsByMonthSchema = z.array(MeetingsByMonthApiItemSchema);

export type TMeetingsByMonth = z.infer<typeof MeetingsByMonthSchema>;
