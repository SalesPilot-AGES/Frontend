import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { TColorThemeOptions } from '@declarations/hooks';
import type { TIconName } from '@declarations/ui';
import { Box, Stack, useTheme } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { InsightChip } from '@pages/DashboardPage/components/InsightChip/InsightChip';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import type {
  TDashboardMetric,
  TDashboardMetricKey,
  TDashboardMetrics,
} from '@services/models/DashboardSchema';
import { useGetDashboardMetrics } from '@services/queries/useDashboard';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';

type TSalesmanMetricCardConfig = {
  key: Extract<TDashboardMetricKey, 'total_meetings' | 'average_duration'>;
  iconName: TIconName;
  iconTheme: TColorThemeOptions;
  label: (typeof ECardLabel)[keyof typeof ECardLabel];
  formatValue: (value: number) => string | number;
};

const defaultMetric: TDashboardMetric = {
  value: 0,
  variationPercentage: 0,
  trend: 'neutral',
};

const mockedAverageSentiment = 90;

const formatAverageDuration = (durationSeconds: number): string =>
  `${Math.round(durationSeconds / 60)} min`;

const metricCardConfig: readonly TSalesmanMetricCardConfig[] = [
  {
    key: 'total_meetings',
    iconName: 'meeting',
    iconTheme: 'meetings',
    label: ECardLabel.TOTAL_MEETINGS,
    formatValue: (value) => value,
  },
  {
    key: 'average_duration',
    iconName: 'duration',
    iconTheme: 'neutrals',
    label: ECardLabel.AVERAGE_DURATION,
    formatValue: formatAverageDuration,
  },
];

const getMetricValue = (
  metrics: TDashboardMetrics | undefined,
  metricKey: TSalesmanMetricCardConfig['key']
): TDashboardMetric => metrics?.[metricKey] ?? defaultMetric;

export const SalesmanDashboard = (): JSX.Element => {
  const { spacing } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data: dashboardMetrics } = useGetDashboardMetrics(filters);

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.SALESMAN_DASHBOARD}
          subtitle={EpageDescriptions.SALESMAN_DASHBOARD}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {metricCardConfig.map((config) => {
            const metric = getMetricValue(dashboardMetrics, config.key);

            return (
              <Box
                key={config.key}
                data-testid={`salesman-dashboard-metric-card-${config.key}`}
                sx={{ position: 'relative' }}
              >
                <StatCard
                  iconName={config.iconName}
                  theme={config.iconTheme}
                  value={config.formatValue(metric.value)}
                  label={config.label}
                />
                <InsightChip
                  variationPercentage={metric.variationPercentage}
                  trend={metric.trend}
                  sx={{
                    position: 'absolute',
                    top: spacing(3),
                    right: spacing(3),
                  }}
                />
              </Box>
            );
          })}

          <Box data-testid="salesman-dashboard-metric-card-average_sentiment">
            <StatCard
              iconName="sentimentHappy"
              theme="success"
              value={`${mockedAverageSentiment}%`}
              label={ECardLabel.AVERAGE_FEELING}
            />
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ width: '100%' }}
        >
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
