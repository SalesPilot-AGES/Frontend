import { EMeetingsByTitle } from '@data/enums/EMeetingsByTitle';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Box, Stack, useTheme } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { CompaniesStatusChart } from '@pages/DashboardPage/components/CompaniesStatusChart/CompaniesStatusChart';
import { MeetingsByChart } from '@pages/DashboardPage/components/MeetingsByChart/MeetingsByChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import { useGetMeetingsByCompany } from '@services/queries/useDashboard';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';
import { useMemo } from 'react';

export const AdminDashboard = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data = [], isError, isLoading } = useGetMeetingsByCompany(filters);

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        label: item.company_name,
        value: item.total_meetings,
      })),
    [data]
  );

  return (
    <PageContainter>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.ADMIN_DASHBOARD}
          subtitle={EpageDescriptions.ADMIN_DASHBOARD}
        />
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <CompaniesStatusChart />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <MeetingsByMonthChart />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <MeetingsByChart
              title={EMeetingsByTitle.MEETINGS_BY_COMPANY}
              data={chartData}
              isLoading={isLoading}
              isError={isError}
              barColor={palette.companies[500]}
              emptyStateIconBg={palette.companies[100]}
              emptyStateIconColor={palette.companies[600]}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <AvgDurationLineChart />
          </Box>
        </Stack>
      </Stack>
    </PageContainter>
  );
};
