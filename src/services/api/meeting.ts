import {
  mapMeetingListItem,
  MeetingContextMetadataSchema,
  MeetingPostAnalysisSchema,
  MeetingRealtimeInsightsSchema,
  MeetingsResponseSchema,
  type TMeetingContextMetadata,
  type TMeetingListItem,
  type TMeetingPostAnalysis,
  type TMeetingRealtimeInsight,
  type TMeetingsResponse,
} from '@services/models/MeetingSchema';
import axios from 'axios';

import apiClient, { unwrapContent } from './apiClient';

export type TMeetingFilters = {
  search?: string;
  companies?: string;
};

export const meetingApi = {
  getMeetings: async (
    page: number = 0,
    size: number = 10,
    filters?: TMeetingFilters
  ): Promise<{
    content: TMeetingListItem[];
    totalElements: number;
    summary: TMeetingsResponse['summary'];
  }> => {
    const response = await apiClient.get<unknown>('/api/meetings', {
      params: {
        page,
        size,
        ...(filters?.search && { search: filters.search }),
        ...(filters?.companies && { companies: filters.companies }),
      },
    });

    const parsedResponse = MeetingsResponseSchema.parse(
      unwrapContent(response.data)
    );

    return {
      content: parsedResponse.content.map(mapMeetingListItem),
      totalElements: parsedResponse.total_elements,
      summary: parsedResponse.summary,
    };
  },

  getMeetingById: async (uuid: string): Promise<TMeetingContextMetadata> => {
    const response = await apiClient.get<unknown>(`/api/meetings/${uuid}`);
    return MeetingContextMetadataSchema.parse(unwrapContent(response.data));
  },

  getMeetingPostAnalysis: async (
    uuid: string
  ): Promise<TMeetingPostAnalysis | null> => {
    try {
      const response = await apiClient.get<unknown>(
        `/api/meetings/${uuid}/post-analysis`
      );
      return MeetingPostAnalysisSchema.parse(unwrapContent(response.data));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  },

  getMeetingInsights: async (
    uuid: string
  ): Promise<TMeetingRealtimeInsight[]> => {
    const response = await apiClient.get<unknown>(
      `/api/meetings/${uuid}/insights`
    );
    return MeetingRealtimeInsightsSchema.parse(unwrapContent(response.data));
  },
};
