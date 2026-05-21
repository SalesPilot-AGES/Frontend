import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Stack } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { DashboardFilterProvider } from '@pages/DashboardPage/context/DashboardFilterProvider';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

import { MeetingsByCompanyChart } from './components/MeetingsByCompanyChart';

export const AdminDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.ADMIN_DASHBOARD}
          subtitle={EpageDescriptions.ADMIN_DASHBOARD}
        />

        <DashboardFilterProvider>
          <MeetingsByCompanyChart />
        </DashboardFilterProvider>
        <AvgDurationLineChart />
      </Stack>
    </PageContainter>
  );
};
