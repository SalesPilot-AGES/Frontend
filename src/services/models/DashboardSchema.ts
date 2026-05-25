import { z } from 'zod';

export type TDashboardPeriod = 'all' | '7d' | '30d' | 'custom';

export type TDashboardFilters = {
  period: TDashboardPeriod;
  startDate?: string;
  endDate?: string;
};

export type TDashboardPeriodParams = {
  period: '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
};

export type TRankedBarChartItem = {
  label: string;
  value: number;
};

const MeetingsByCompanyItemApiSchema = z.object({
  company_name: z.string().trim().min(1),
  total_meetings: z.number().int().nonnegative().optional(),
  meetings_total: z.number().int().nonnegative().optional(),
  meetings_count: z.number().int().nonnegative().optional(),
  total: z.number().int().nonnegative().optional(),
});

const getTotalMeetings = (
  row: z.infer<typeof MeetingsByCompanyItemApiSchema>
): number => {
  return (
    row.total_meetings ??
    row.meetings_total ??
    row.meetings_count ??
    row.total ??
    0
  );
};

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
): number => {
  return (
    row.total_meetings ??
    row.meetings_total ??
    row.meetings_count ??
    row.total ??
    0
  );
};

export const MeetingsBySalesmanSchema = z
  .array(MeetingsBySalesmanItemApiSchema)
  .transform((rows) =>
    rows.map((row) => ({
      salesman_name: row.salesman_name,
      total_meetings: getTotalMeetingsSalesman(row),
    }))
  );

export type TMeetingsBySalesman = z.infer<typeof MeetingsBySalesmanSchema>;

const StatusCountApiSchema = z
  .object({
    active: z.number().optional(),
    inactive: z.number().optional(),
    ativo: z.number().optional(),
    inativo: z.number().optional(),
  })
  .transform((item) => ({
    active: item.active ?? item.ativo ?? 0,
    inactive: item.inactive ?? item.inativo ?? 0,
  }));

export const StatusCountResponseSchema = z
  .object({ data: StatusCountApiSchema })
  .transform((r) => r.data)
  .or(StatusCountApiSchema);

export type TDashboardStatusCount = { active: number; inactive: number };
