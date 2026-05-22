import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Stack } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

export const SalesmanDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.SALESMAN_DASHBOARD}
          subtitle={EpageDescriptions.SALESMAN_DASHBOARD}
        />
        <MeetingsByMonthChart />
        <AvgDurationLineChart />
      </Stack>
    </PageContainter>
  );
};
