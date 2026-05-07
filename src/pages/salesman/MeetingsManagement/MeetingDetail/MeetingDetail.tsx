import {
  Box,
  CircularProgress,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import {
  useGetMeetingById,
  useGetMeetingPostAnalysis,
} from '@services/queries/useMeetings';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { type JSX } from 'react';
import React from 'react';

import type { TMeetingDetail, TMeetingTab } from './MeetingDetail.interface';
import { MeetingDetailHeaderStats } from './MeetingDetailHeaderStats/MeetingDetailHeaderStats';
import { MeetingDetailTabsContent } from './MeetingDetailTabsContent/MeetingDetailTabsContent';

export const MeetingDetail = (): JSX.Element => {
  const { palette, breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));

  const themePalette = palette as typeof palette;

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

  const responsiveValueFontSize = isDesktop
    ? '1.25rem !important'
    : '1rem !important';

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%', height: '100%' }}>
        <MeetingDetailHeaderStats
          meeting={meeting}
          sentimentScore={meetingPostAnalysis?.sentiment_analysis?.score}
          palette={palette}
          themePalette={themePalette}
          responsiveValueFontSize={responsiveValueFontSize}
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
            meetingInsights={[]}
            isMeetingInsightsLoading={false}
          />
        </Box>
      </Stack>
    </PageContainter>
  );
};
