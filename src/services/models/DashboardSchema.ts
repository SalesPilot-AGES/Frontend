import { z } from 'zod';

export type TDashboardPeriod = 'all' | '7d' | '30d' | 'custom';

export type TDashboardFilters = {
  period: TDashboardPeriod;
  startDate?: string;
  endDate?: string;
};

export type TDashboardPeriodParams = TDashboardFilters;

export type TRankedBarChartItem = {
  label: string;
  value: number;
};

export const DashboardMetricTrendSchema = z.enum(['up', 'down', 'neutral']);

export const DashboardMetricKeySchema = z.enum([
  'active_companies',
  'inactive_companies',
  'average_duration',
  'average_sentiment',
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
    variation_percent: z.number().optional(),
    variation_pct: z.number().optional(),
    variationPct: z.number().optional(),
    percentage: z.number().optional(),
    trend: DashboardMetricTrendSchema.optional(),
  })
  .transform((metric) => {
    const variationPercentage =
      metric.variation ??
      metric.variation_percent ??
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

export type TDashboardMetric = z.infer<typeof DashboardMetricApiSchema>;
export type TDashboardMetrics = Partial<
  Record<TDashboardMetricKey, TDashboardMetric>
>;

const assignMetric = (
  metrics: TDashboardMetrics,
  key: TDashboardMetricKey,
  metric?: TDashboardMetric
): void => {
  if (metric) {
    metrics[key] = metric;
  }
};

export const DashboardMetricsResponseSchema = z
  .object({
    active_companies: DashboardMetricApiSchema.optional(),
    inactive_companies: DashboardMetricApiSchema.optional(),
    average_duration: DashboardMetricApiSchema.optional(),
    average_sentiment: DashboardMetricApiSchema.optional(),
    total_meetings: DashboardMetricApiSchema.optional(),
    active_sellers: DashboardMetricApiSchema.optional(),
    salesmen: DashboardMetricApiSchema.optional(),
  })
  .transform((response) => {
    const metrics: TDashboardMetrics = {};

    assignMetric(metrics, 'active_companies', response.active_companies);
    assignMetric(metrics, 'inactive_companies', response.inactive_companies);
    assignMetric(metrics, 'average_duration', response.average_duration);
    assignMetric(metrics, 'average_sentiment', response.average_sentiment);
    assignMetric(metrics, 'total_meetings', response.total_meetings);
    assignMetric(
      metrics,
      'salesmen',
      response.active_sellers ?? response.salesmen
    );

    return metrics;
  });

const MeetingsByCompanyItemApiSchema = z.object({
  company_name: z.string().trim().min(1),
  total_meetings: z.number().int().nonnegative().optional(),
  meetings_total: z.number().int().nonnegative().optional(),
  meetings_count: z.number().int().nonnegative().optional(),
  total: z.number().int().nonnegative().optional(),
});

const getTotalMeetings = (
  row: z.infer<typeof MeetingsByCompanyItemApiSchema>
): number =>
  row.total_meetings ??
  row.meetings_total ??
  row.meetings_count ??
  row.total ??
  0;

export const MeetingsByCompanySchema = z
  .array(MeetingsByCompanyItemApiSchema)
  .transform((rows) =>
    rows.map((row) => ({
      company_name: row.company_name,
      total_meetings: getTotalMeetings(row),
    }))
  );

export type TMeetingsByCompany = z.infer<typeof MeetingsByCompanySchema>;

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

const MeetingsBySalesmanItemApiSchema = z.object({
  salesman_name: z.string().trim().min(1),
  total_meetings: z.number().int().nonnegative().optional(),
  meetings_total: z.number().int().nonnegative().optional(),
  meetings_count: z.number().int().nonnegative().optional(),
  total: z.number().int().nonnegative().optional(),
});

const getTotalMeetingsSalesman = (
  row: z.infer<typeof MeetingsBySalesmanItemApiSchema>
): number =>
  row.total_meetings ??
  row.meetings_total ??
  row.meetings_count ??
  row.total ??
  0;

export const MeetingsBySalesmanSchema = z
  .array(MeetingsBySalesmanItemApiSchema)
  .transform((rows) =>
    rows.map((row) => ({
      salesman_name: row.salesman_name,
      total_meetings: getTotalMeetingsSalesman(row),
    }))
  );

export type TMeetingsBySalesman = z.infer<typeof MeetingsBySalesmanSchema>;

export const StatusCountResponseSchema = z
  .object({
    data: z.array(z.object({ label: z.string(), value: z.number() })),
    total: z.number().optional(),
  })
  .transform(({ data }) => ({
    active:
      data.find(
        (item) =>
          item.label.toLowerCase() === 'ativas' ||
          item.label.toLowerCase() === 'active'
      )?.value ?? 0,
    inactive:
      data.find(
        (item) =>
          item.label.toLowerCase() === 'inativas' ||
          item.label.toLowerCase() === 'inactive'
      )?.value ?? 0,
  }));

export type TDashboardStatusCount = { active: number; inactive: number };

const DashboardAvgDurationPointApiSchema = z.object({
  month: z.string(),
  month_label: z.string(),
  avg_minutes: z.number(),
});

export const DashboardAvgDurationResponseSchema = z.object({
  data: z.array(DashboardAvgDurationPointApiSchema),
});

export type TDashboardAvgDurationApiPoint = z.infer<
  typeof DashboardAvgDurationPointApiSchema
>;

export type TDashboardAvgDurationPoint = {
  month: string;
  monthLabel: string;
  avgMinutes: number;
};
