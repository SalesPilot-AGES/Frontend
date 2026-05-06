import { Box, Tab, Tabs, Typography } from '@mui/material';
import { type JSX } from 'react';
import React from 'react';

import type { TMeetingTab } from '../MeetingDetail.interface';

type TMeetingDetailTabsContentProps = {
  currentTab: TMeetingTab;
  onTabChange: (_event: React.SyntheticEvent, newValue: string) => void;
};

const MeetingContext = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Contexto da Reunião</Typography>
  </Box>
);

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
        <Tab label="CONTEXTO DA REUNIÃO" value="context" />
        <Tab label="INSIGHTS NA REUNIÃO" value="insights" />
        <Tab label="PLANO DE AÇÃO" value="action-plan" />
      </Tabs>
    </Box>

    <Box minHeight="300px">
      {currentTab === 'context' && <MeetingContext />}
      {currentTab === 'insights' && <MeetingInsights />}
      {currentTab === 'action-plan' && <MeetingActionPlan />}
    </Box>
  </Box>
);
