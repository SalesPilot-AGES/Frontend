import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { getSentimentConfig } from '@hooks/useSentiment';
import { Box, Stack, useTheme } from '@mui/material';
import { AvgDurationLineChart } from '@pages/DashboardPage/components/AvgDurationLineChart/AvgDurationLineChart';
import { InsightChip } from '@pages/DashboardPage/components/InsightChip/InsightChip';
import { MeetingsByMonthChart } from '@pages/DashboardPage/components/MeetingsByMonthChart/MeetingsByMonthChart';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import {
  type TDashboardMetricKey,
  type TDashboardMetrics,
} from '@services/models/DashboardSchema';
import { useGetDashboardMetrics } from '@services/queries/useDashboard';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';

type TSalesmanMetricCardConfig = {
  key: Extract<TDashboardMetricKey, 'average_duration' | 'total_meetings'>;
  iconName: 'duration' | 'meeting';
  iconTheme: 'meetings' | 'neutrals';
  label: (typeof ECardLabel)[keyof typeof ECardLabel];
  formatValue: (value: number) => string | number;
};

const SECONDS_PER_MINUTE = 60;
const MOCK_AVERAGE_SENTIMENT_PERCENT = 90;

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
    formatValue: (value) => `${Math.round(value / SECONDS_PER_MINUTE)} min`,
  },
];

const getMetricValue = (
  metrics: TDashboardMetrics | undefined,
  metricKey: TSalesmanMetricCardConfig['key']
): TDashboardMetrics[TDashboardMetricKey] =>
  metrics?.[metricKey] ?? {
    value: 0,
    variationPercentage: 0,
    trend: 'neutral' as const,
  };

type TSalesmanStatCardsProps = {
  metrics: TDashboardMetrics | undefined;
};

const SalesmanStatCards = ({
  metrics,
}: TSalesmanStatCardsProps): JSX.Element => {
  const { spacing } = useTheme();
  const sentimentConfig = getSentimentConfig(MOCK_AVERAGE_SENTIMENT_PERCENT);

  return (
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
        const metric = getMetricValue(metrics, config.key);

        return (
          <Box
            key={config.key}
            data-testid={`dashboard-metric-card-${config.key}`}
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

      <Box data-testid="dashboard-metric-card-average_sentiment">
        <StatCard
          iconName={sentimentConfig.iconName}
          theme={sentimentConfig.theme}
          value={`${MOCK_AVERAGE_SENTIMENT_PERCENT}%`}
          label={ECardLabel.AVERAGE_FEELING}
        />
      </Box>
    </Box>
  );
};

export const SalesmanDashboard = (): JSX.Element => {
  const { filters } = useDashboardFilterContext();
  const { data: dashboardMetrics } = useGetDashboardMetrics(filters);

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <PageHeader
          title={EPageTitles.SALESMAN_DASHBOARD}
          subtitle={EpageDescriptions.SALESMAN_DASHBOARD}
        />

        <SalesmanStatCards metrics={dashboardMetrics} />

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
