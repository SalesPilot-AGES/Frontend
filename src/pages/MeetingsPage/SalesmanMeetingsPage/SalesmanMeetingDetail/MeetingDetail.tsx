import { Box, CircularProgress, Stack } from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import type {
  TMeetingDetail,
  TMeetingTab,
} from '@services/models/MeetingSchema';
import {
  useGetMeetingById,
  useGetMeetingInsights,
  useGetMeetingPostAnalysis,
} from '@services/queries/useMeetings';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { type JSX } from 'react';
import React from 'react';

import { MeetingDetailHeaderStats } from './components/MeetingDetailHeaderStats';
import { MeetingDetailTabsContent } from './components/MeetingDetailTabsContent';

export const MeetingDetail = (): JSX.Element => {
  const { meetingId } = useParams({ strict: false }) as { meetingId: string };
  const search = useSearch({
    from: '/protected/reuniões/$meetingId',
  });

  const currentTab = (search.tab || 'context') as TMeetingTab;
  const navigate = useNavigate({
    from: '/reuniões/$meetingId',
  });

  const {
    data: rawMeeting,
    isLoading,
    isError,
  } = useGetMeetingById(meetingId ?? null);
  const { data: meetingPostAnalysis, isLoading: isMeetingPostAnalysisLoading } =
    useGetMeetingPostAnalysis(meetingId ?? null);
  const { data: meetingInsights = [], isLoading: isMeetingInsightsLoading } =
    useGetMeetingInsights(meetingId ?? null);

  const meeting = rawMeeting as TMeetingDetail | undefined;

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ): void => {
    navigate({
      search: ((old: Record<string, string>) => ({
        ...old,
        tab: newValue as TMeetingTab,
      })) as never,
      replace: true,
    });
  };

  if (isLoading) {
    return (
      <PageContainter>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      </PageContainter>
    );
  }

  if (isError || !meeting) {
    return <PageNotFound />;
  }

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%', height: '100%' }}>
        <MeetingDetailHeaderStats
          meeting={meeting}
          sentimentScore={meetingPostAnalysis?.sentiment_analysis?.score}
        />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <MeetingDetailTabsContent
            meeting={meeting}
            meetingPostAnalysis={meetingPostAnalysis || null}
            isMeetingPostAnalysisLoading={isMeetingPostAnalysisLoading}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            meetingInsights={meetingInsights}
            isMeetingInsightsLoading={isMeetingInsightsLoading}
          />
        </Box>
      </Stack>
    </PageContainter>
  );
};
