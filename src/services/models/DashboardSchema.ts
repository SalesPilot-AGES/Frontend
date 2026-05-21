import { z } from 'zod';

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
