import { z } from 'zod';

/**
 * Item de reunião vindo da API (listagem)
 */
export const MeetingListItemApiSchema = z.object({
  id: z.string(),
  title: z.string(),

  seller: z.object({
    id: z.string(),
    name: z.string(),
  }),

  client: z.object({
    id: z.string(),
    name: z.string(),
    client_company_name: z.string(),
  }),

  meeting_type: z.string(),

  scheduled_for: z.string(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable(),

  duration_seconds: z.number(),
  status: z.string(),
});

/**
 * Summary (stats da tela)
 */
export const MeetingSummarySchema = z.object({
  total_meetings: z.number(),
  average_duration_seconds: z.number(),
  success_rate: z.number(),
});

/**
 * Response paginada de reuniões
 */
export const MeetingsResponseSchema = z.object({
  content: z.array(MeetingListItemApiSchema),
  total_elements: z.number(),
  total_pages: z.number(),
  summary: MeetingSummarySchema,
});

/**
 * Tipo final usado no front (mapeado)
 */
export type TMeetingListItem = {
  id: string;
  title: string;

  sellerName: string;
  companyName: string;

  date: string;
  durationMinutes: number;

  status: string;
};

/**
 * Mapper (igual Manager)
 */
export const mapMeetingListItem = (
  row: z.infer<typeof MeetingListItemApiSchema>
): TMeetingListItem => {
  return {
    id: row.id,
    title: row.title,

    sellerName: row.seller.name,
    companyName: row.client.client_company_name,

    date: row.scheduled_for,
    durationMinutes: Math.round(row.duration_seconds / 60),

    status: row.status,
  };
};

export type TMeetingsResponse = z.infer<typeof MeetingsResponseSchema>;
export type TMeetingSummary = z.infer<typeof MeetingSummarySchema>;
