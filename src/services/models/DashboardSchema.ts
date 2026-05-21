import { z } from 'zod';

export type TDashboardPeriod = 'all' | '7d' | '30d' | 'custom';

export type TDashboardFilters = {
  period: TDashboardPeriod;
  startDate?: string;
  endDate?: string;
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
