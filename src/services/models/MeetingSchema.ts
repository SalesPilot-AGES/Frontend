import { z } from 'zod';

const MeetingSellerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
});

const MeetingClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  client_company_name: z.string(),
  sector: z.string().optional(),
  overall_sentiment: z.number().optional(),
});

/**
 * Item de reunião vindo da API (listagem)
 */
export const MeetingListItemApiSchema = z.object({
  id: z.string(),
  title: z.string(),

  seller: MeetingSellerSchema,
  client: MeetingClientSchema,

  meeting_type: z.string(),

  scheduled_for: z.string(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable(),

  duration_seconds: z.number(),
  status: z.string(),
});

const MeetingPreAnalysisSchema = z.object({
  id: z.string(),
  recommended_strategy: z
    .object({
      focus: z.string(),
    })
    .optional(),
  key_points: z.array(z.string()).optional(),
  possible_objections: z.array(z.string()).optional(),
  created_at: z.string().optional(),
});

/**
 * Payload de detalhe/contexto da reunião
 */
export const MeetingContextMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  meeting_type: z.string(),
  objective: z.string().nullish(),
  client_needs: z.string().nullish(),
  previous_interactions: z.string().nullish(),
  competitors_involved: z.string().nullish(),
  scheduled_for: z.string(),
  started_at: z.string().nullable().optional(),
  ended_at: z.string().nullable().optional(),
  duration_seconds: z.number().nullish(),
  seller: MeetingSellerSchema,
  client: MeetingClientSchema,
  pre_analysis: MeetingPreAnalysisSchema.optional(),
  created_at: z.string().optional(),
});

/**
 * Payload de pós-análise da reunião
 */
export const MeetingPostAnalysisSchema = z.object({
  id: z.string(),
  meeting_id: z.string(),
  summary: z.string().optional(),
  action_items: z
    .array(
      z.object({
        text: z.string(),
        done: z.boolean(),
      })
    )
    .optional(),
  sentiment_analysis: z
    .object({
      overall: z.string(),
      score: z.number(),
    })
    .optional(),
  created_at: z.string().optional(),
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
export type TMeetingContextMetadata = z.infer<
  typeof MeetingContextMetadataSchema
>;
export type TMeetingPostAnalysis = z.infer<typeof MeetingPostAnalysisSchema>;
