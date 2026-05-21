import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Stack } from '@mui/material';
import { DashboardFilterProvider } from '@pages/DashboardPage/context/DashboardFilterProvider';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';

import { MeetingsByCompanyChart } from './components/MeetingsByCompanyChart';

export const AdminDashboard = (): JSX.Element => {
  return (
    <PageContainter>
      <Stack width="100%" spacing={2}>
        <PageHeader
          title={EPageTitles.ADMIN_DASHBOARD}
          subtitle={EpageDescriptions.ADMIN_DASHBOARD}
        />

        <DashboardFilterProvider>
          <MeetingsByCompanyChart />
        </DashboardFilterProvider>
      </Stack>
    </PageContainter>
  );
};
