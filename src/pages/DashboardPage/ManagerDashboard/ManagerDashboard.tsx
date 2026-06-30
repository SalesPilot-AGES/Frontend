import { ECardLabel } from '@data/enums/ECardLabel';
import { EMeetingsByTitle } from '@data/enums/EMeetingsByTitle';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Box, Grid, Stack, useTheme } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { MeetingsByChart } from '@pages/DashboardPage/components/MeetingsByChart/MeetingsByChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { SalesmenStatusChart } from '@pages/DashboardPage/components/SalesmenStatusChart/SalesmenStatusChart';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import {
  useGetDashboardMetrics,
  useGetMeetingsBySalesman,
  useGetSalesmenStatus,
} from '@services/queries/useDashboard';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';
import { useMemo } from 'react';

export const ManagerDashboard = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data = [], isError, isLoading } = useGetMeetingsBySalesman(filters);
  const { data: dashboardMetrics } = useGetDashboardMetrics(filters);
  const { data: salesmenStatus } = useGetSalesmenStatus();

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        label: item.salesman_name,
        value: item.total_meetings ?? 0,
      })),
    [data]
  );

  const activeSalesmenValue = salesmenStatus?.active ?? 0;
  const totalMeetingsValue = dashboardMetrics?.total_meetings?.value ?? 0;

  return (
    <PageContainter>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.MANAGER_DASHBOARD}
          subtitle={EpageDescriptions.MANAGER_DASHBOARD}
        />

        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            data-testid="manager-dashboard-metric-card-active-salesmen"
          >
            <StatCard
              iconName="salesman"
              theme="salesmen"
              value={activeSalesmenValue}
              label={ECardLabel.ACTIVE_SALESMAN}
            />
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            data-testid="manager-dashboard-metric-card-inactive-salesmen"
          >
            <StatCard
              iconName="salesman"
              theme="neutrals"
              value={salesmenStatus?.inactive ?? 0}
              label={ECardLabel.INACTIVE_SALESMAN}
            />
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            data-testid="manager-dashboard-metric-card-total-meetings"
          >
            <StatCard
              iconName="meeting"
              theme="meetings"
              value={totalMeetingsValue}
              label={ECardLabel.TOTAL_MEETINGS}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <SalesmenStatusChart />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <MeetingsByMonthChart />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0, height: '100%' }}>
            <MeetingsByChart
              title={EMeetingsByTitle.MEETINGS_BY_SALESMAN}
              data={chartData}
              isLoading={isLoading}
              isError={isError}
              barColor={palette.salesmen?.[500] ?? palette.primary[500]}
              emptyStateIconBg={palette.salesmen?.[100] ?? palette.primary[100]}
              emptyStateIconColor={
                palette.salesmen?.[600] ?? palette.primary[600]
              }
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
