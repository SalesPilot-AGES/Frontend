import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import { Box, Tab, Tabs } from '@mui/material';
import type { TMeetingPostAnalysis } from '@services/models/MeetingSchema';
import type { JSX } from 'react';
import React from 'react';

import { MeetingActionPlan } from '../MeetingActionPlan/MeetingActionPlan';
import { MeetingContext } from '../MeetingContext/MeetingContext';
import type { TMeetingDetail, TMeetingTab } from '../MeetingDetail.interface';
import { MeetingInsights } from '../MeetingInsights/MeetingInsights';

type TMeetingDetailTabsContentProps = {
  meeting: TMeetingDetail;
  meetingPostAnalysis: TMeetingPostAnalysis | null;
  isMeetingPostAnalysisLoading: boolean;
  currentTab: TMeetingTab;
  onTabChange: (_event: React.SyntheticEvent, newValue: string) => void;
};

export const MeetingDetailTabsContent = ({
  meeting,
  meetingPostAnalysis,
  isMeetingPostAnalysisLoading,
  currentTab,
  onTabChange,
}: TMeetingDetailTabsContentProps): JSX.Element => {
  const insightsToRender = meetingPostAnalysis?.insights ?? [];
  const actionItemsFromApi =
    meetingPostAnalysis?.action_plan ?? meetingPostAnalysis?.action_items;
  const actionItemsToRender = actionItemsFromApi ?? [];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={onTabChange} variant="fullWidth">
          <Tab
            label="CONTEXTO DA REUNIÃO"
            value="context"
            icon={<DescriptionOutlinedIcon />}
            iconPosition="start"
          />
          <Tab
            label="INSIGHTS NA REUNIÃO"
            value="insights"
            icon={<LightbulbOutlinedIcon />}
            iconPosition="start"
          />
          <Tab
            label="PLANO DE AÇÃO"
            value="action-plan"
            icon={<PlaylistAddCheckCircleOutlinedIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {currentTab === 'context' && (
          <MeetingContext
            meeting={meeting}
            summary={meetingPostAnalysis?.summary || null}
            isSummaryLoading={isMeetingPostAnalysisLoading}
          />
        )}

        {currentTab === 'insights' && (
          <MeetingInsights
            insights={insightsToRender}
            isLoading={isMeetingPostAnalysisLoading}
          />
        )}

        {currentTab === 'action-plan' && (
          <MeetingActionPlan
            actionItems={actionItemsToRender}
            isLoading={isMeetingPostAnalysisLoading}
          />
        )}
      </Box>
    </Box>
  );
};
