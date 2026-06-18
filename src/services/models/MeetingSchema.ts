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

const MeetingInsightSchema = z.union([
  z.string(),
  z.object({
    text: z.string().optional(),
    insight: z.string().optional(),
    category: z.string().nullable().optional(),
    tag: z.string().nullable().optional(),
    priority: z.string().nullable().optional(),
  }),
]);

const MeetingActionItemSchema = z.union([
  z.string(),
  z.object({
    text: z.string().optional(),
    description: z.string().optional(),
    done: z.boolean().optional(),
    responsible: z.string().nullable().optional(),
    owner: z.string().nullable().optional(),
    due_date: z.string().nullable().optional(),
    deadline: z.string().nullable().optional(),
    due_in_days: z.number().nullable().optional(),
  }),
]);

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
  insights: z.array(MeetingInsightSchema).optional(),
  action_plan: z.array(MeetingActionItemSchema).optional(),
  action_items: z.array(MeetingActionItemSchema).optional(),
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
export const MeetingsResponseSchema = z
  .object({
    content: z.array(MeetingListItemApiSchema),
    totalElements: z.number().optional(),
    total_elements: z.number().optional(),
    totalPages: z.number().optional(),
    total_pages: z.number().optional(),
    summary: MeetingSummarySchema,
  })
  .transform((data) => ({
    content: data.content,
    total_elements: data.totalElements ?? data.total_elements ?? 0,
    total_pages: data.totalPages ?? data.total_pages ?? 0,
    summary: data.summary,
  }));

/**
 * Tipo final usado no front (mapeado)
 */
/**
 * Insights em tempo real da reunião (GET /api/meetings/{id}/insights)
 */
export const MeetingRealtimeInsightSchema = z.object({
  id: z.string(),
  type: z.enum(['KEY_POINT', 'ACTION_ITEM']),
  description: z.object({ text: z.string() }),
  content: z.string(),
  created_at: z.string(),
});

export const MeetingRealtimeInsightsSchema = z.array(
  MeetingRealtimeInsightSchema
);

export type TMeetingRealtimeInsight = z.infer<
  typeof MeetingRealtimeInsightSchema
>;

/**
 * Tipo final usado no front (mapeado)
 */
export type TMeetingListItem = {
  id: string;
  title: string;

  sellerName: string;
  clientName: string;
  companyName: string;
  sentiment?: number;

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
    clientName: row.client.name,
    companyName: row.client.client_company_name,
    sentiment: row.client.overall_sentiment,

    date: row.scheduled_for,
    durationMinutes: Math.round(row.duration_seconds / 60),

    status: row.status,
  };
};

export type TMeetingDetail = TMeetingContextMetadata;
export type TMeetingTab = 'context' | 'insights' | 'action-plan';
export type TMeetingsResponse = z.infer<typeof MeetingsResponseSchema>;
export type TMeetingSummary = z.infer<typeof MeetingSummarySchema>;
export type TMeetingContextMetadata = z.infer<
  typeof MeetingContextMetadataSchema
>;
export type TMeetingPostAnalysis = z.infer<typeof MeetingPostAnalysisSchema>;
export type TMeetingInsight = z.infer<typeof MeetingInsightSchema>;
export type TMeetingActionItem = z.infer<typeof MeetingActionItemSchema>;
