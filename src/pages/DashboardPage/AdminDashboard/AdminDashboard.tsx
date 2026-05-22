import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Box, Stack } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const AdminDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.ADMIN_DASHBOARD}
          subtitle={EpageDescriptions.ADMIN_DASHBOARD}
        />
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <MeetingsByMonthChart />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <AvgDurationLineChart />
          </Box>
        </Stack>
      </Stack>
    </PageContainter>
  );
};
