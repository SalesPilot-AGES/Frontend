import { ECardLabel } from '@data/enums/ECardLabel';
import { EMeetingsByTitle } from '@data/enums/EMeetingsByTitle';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Box, Stack, useTheme } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { CompaniesStatusChart } from '@pages/DashboardPage/components/CompaniesStatusChart/CompaniesStatusChart';
import { MeetingsByChart } from '@pages/DashboardPage/components/MeetingsByChart/MeetingsByChart';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import {
  type TDashboardMetricKey,
  type TDashboardMetrics,
} from '@services/models/DashboardSchema';
import {
  useGetDashboardMetrics,
  useGetMeetingsByCompany,
} from '@services/queries/useDashboard';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';
import { useMemo } from 'react';

type TMetricCardConfig = {
  key: TDashboardMetricKey;
  iconName: 'company' | 'meeting' | 'salesman';
  iconTheme: 'companies' | 'neutrals' | 'meetings' | 'salesmen';
  label: (typeof ECardLabel)[keyof typeof ECardLabel];
};

const metricCardConfig: readonly TMetricCardConfig[] = [
  {
    key: 'active_companies',
    iconName: 'company',
    iconTheme: 'companies',
    label: ECardLabel.ACTIVE_COMPANIES,
  },
  {
    key: 'inactive_companies',
    iconName: 'company',
    iconTheme: 'neutrals',
    label: ECardLabel.INACTIVE_COMPANIES,
  },
  {
    key: 'salesmen',
    iconName: 'salesman',
    iconTheme: 'salesmen',
    label: ECardLabel.ACTIVE_SALESMAN,
  },
  {
    key: 'total_meetings',
    iconName: 'meeting',
    iconTheme: 'meetings',
    label: ECardLabel.TOTAL_MEETINGS,
  },
];

const getMetricValue = (
  metrics: TDashboardMetrics | undefined,
  metricKey: TDashboardMetricKey
): TDashboardMetrics[TDashboardMetricKey] =>
  metrics?.[metricKey] ?? {
    value: 0,
    variationPercentage: 0,
    trend: 'neutral' as const,
  };

export const AdminDashboard = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data = [], isError, isLoading } = useGetMeetingsByCompany(filters);
  const { data: dashboardMetrics } = useGetDashboardMetrics(filters);

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
      <Stack spacing={2} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.ADMIN_DASHBOARD}
          subtitle={EpageDescriptions.ADMIN_DASHBOARD}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {metricCardConfig.map((config) => {
            const metric = getMetricValue(dashboardMetrics, config.key);

            return (
              <Box
                key={config.key}
                data-testid={`dashboard-metric-card-${config.key}`}
              >
                <StatCard
                  iconName={config.iconName}
                  theme={config.iconTheme}
                  value={metric.value}
                  label={config.label}
                />
              </Box>
            );
          })}
        </Box>

        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CompaniesStatusChart />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <MeetingsByMonthChart />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
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
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <AvgDurationLineChart />
          </Box>
        </Stack>
      </Stack>
    </PageContainter>
  );
};
