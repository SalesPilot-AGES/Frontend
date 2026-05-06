import {
  mapMeetingListItem,
  MeetingsResponseSchema,
  type TMeetingListItem,
  type TMeetingsResponse,
} from '@services/models/MeetingSchema';

import apiClient from './apiClient';

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

    const parsedResponse = MeetingsResponseSchema.parse(response.data);

    return {
      content: parsedResponse.content.map(mapMeetingListItem),
      totalElements: parsedResponse.total_elements,
      summary: parsedResponse.summary,
    };
  },

  getMeetingById: async (uuid: string): Promise<unknown> => {
    const response = await apiClient.get<unknown>(`/api/meetings/${uuid}`);
    return response.data;
  },
};
