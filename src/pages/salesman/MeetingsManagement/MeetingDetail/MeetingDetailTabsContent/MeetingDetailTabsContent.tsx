import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { type JSX } from 'react';
import React from 'react';

import { MeetingContext } from '../MeetingContext/MeetingContext';
import type { TMeetingDetail, TMeetingTab } from '../MeetingDetail.interface';

type TMeetingDetailTabsContentProps = {
  meeting: TMeetingDetail;
  meetingSummary: string | null;
  isMeetingSummaryLoading: boolean;
  currentTab: TMeetingTab;
  onTabChange: (_event: React.SyntheticEvent, newValue: string) => void;
};

const MeetingInsights = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Insights na Reunião</Typography>
  </Box>
);

const MeetingActionPlan = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Plano de Ação</Typography>
  </Box>
);

export const MeetingDetailTabsContent = ({
  meeting,
  meetingSummary,
  isMeetingSummaryLoading,
  currentTab,
  onTabChange,
}: TMeetingDetailTabsContentProps): JSX.Element => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      borderRadius: '1rem',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
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

    <Box minHeight="300px">
      {currentTab === 'context' && (
        <MeetingContext
          meeting={meeting}
          summary={meetingSummary}
          isSummaryLoading={isMeetingSummaryLoading}
        />
      )}
      {currentTab === 'insights' && <MeetingInsights />}
      {currentTab === 'action-plan' && <MeetingActionPlan />}
    </Box>
  </Box>
);
