import { meetingApi, type TMeetingFilters } from '@services/api/meeting';
import type {
  TMeetingContextMetadata,
  TMeetingListItem,
  TMeetingPostAnalysis,
  TMeetingsResponse,
} from '@services/models/MeetingSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const meetingsQueryKeys = {
  all: ['meetings'] as const,
  lists: () => [...meetingsQueryKeys.all, 'list'] as const,
  list: (page: number, size: number, filters?: TMeetingFilters) =>
    [...meetingsQueryKeys.lists(), { page, size, filters }] as const,
  details: () => [...meetingsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...meetingsQueryKeys.details(), id] as const,
  postAnalysis: (id: string) =>
    [...meetingsQueryKeys.detail(id), 'post-analysis'] as const,
};

export type TMeetingsListResult = {
  content: TMeetingListItem[];
  totalElements: number;
  summary: TMeetingsResponse['summary'];
};

export const useGetMeetings = (
  page: number = 0,
  size: number = 20,
  filters?: TMeetingFilters,
  options?: UseQueryOptions<TMeetingsListResult>
): ReturnType<typeof useQuery<TMeetingsListResult, Error>> => {
  return useQuery<TMeetingsListResult, Error>({
    queryKey: meetingsQueryKeys.list(page, size, filters),
    queryFn: () => meetingApi.getMeetings(page, size, filters),
    staleTime: 0,
    ...options,
  });
};

export const useGetMeetingById = (
  uuid: string | null,
  options?: UseQueryOptions<TMeetingContextMetadata>
): ReturnType<typeof useQuery<TMeetingContextMetadata, Error>> => {
  return useQuery<TMeetingContextMetadata, Error>({
    queryKey: meetingsQueryKeys.detail(uuid || ''),
    queryFn: () => meetingApi.getMeetingById(uuid!),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetMeetingPostAnalysis = (
  uuid: string | null,
  options?: UseQueryOptions<TMeetingPostAnalysis | null>
): ReturnType<typeof useQuery<TMeetingPostAnalysis | null, Error>> => {
  return useQuery<TMeetingPostAnalysis | null, Error>({
    queryKey: meetingsQueryKeys.postAnalysis(uuid || ''),
    queryFn: () => meetingApi.getMeetingPostAnalysis(uuid!),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
