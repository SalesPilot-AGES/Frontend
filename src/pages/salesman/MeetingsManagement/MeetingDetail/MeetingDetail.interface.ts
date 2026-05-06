import type { MeetingListItemApiSchema } from '@services/models/MeetingSchema';
import type z from 'zod';

export type TMeetingDetail = z.infer<typeof MeetingListItemApiSchema> & {
  client: { overall_sentiment?: number };
};
export type TMeetingTab = 'context' | 'insights' | 'action-plan';

// Isso é só pra resolver o problema do EsLint de limite de linhas
