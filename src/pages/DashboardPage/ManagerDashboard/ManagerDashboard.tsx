import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Stack } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const ManagerDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.MANAGER_DASHBOARD}
          subtitle={EpageDescriptions.MANAGER_DASHBOARD}
        />
        <MeetingsByMonthChart />
        <AvgDurationLineChart />
      </Stack>
    </PageContainter>
  );
};
