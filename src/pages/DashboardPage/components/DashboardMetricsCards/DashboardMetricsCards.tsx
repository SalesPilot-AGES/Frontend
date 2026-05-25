import { ECardLabel } from '@data/enums/ECardLabel';
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  type TDashboardMetricKey,
  type TDashboardMetrics,
} from '@services/models/DashboardSchema';
import { useGetDashboardMetrics } from '@services/queries/useDashboard';
import type { JSX } from 'react';

import { useDashboardFilterContext } from '../../useDashboardFilterContext';
import { MetricCard } from '../MetricCard/MetricCard';

type TMetricCardConfig = {
  key: TDashboardMetricKey;
  iconName: 'company' | 'meeting' | 'salesman';
  iconTheme: 'companies' | 'neutrals' | 'meetings' | 'salesmen';
  label: string;
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
    label: ECardLabel.SALESMAN,
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

export const DashboardMetricsCards = (): JSX.Element => {
  const { palette } = useTheme();
  const { period } = useDashboardFilterContext();
  const { data, isLoading, isError } = useGetDashboardMetrics(period);

  if (isLoading && !data) {
    return (
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
        {metricCardConfig.map((config) => (
          <Paper
            key={config.key}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: palette.neutrals[200],
              borderRadius: '0.75rem',
              padding: '1.5rem',
            }}
          >
            <Stack spacing={2}>
              <Skeleton variant="rounded" width={96} height={24} />
              <Skeleton variant="text" width={120} height={36} />
              <Skeleton variant="text" width={140} height={24} />
            </Stack>
          </Paper>
        ))}
      </Box>
    );
  }

  if (isError && !data) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: palette.neutrals[200],
          borderRadius: '0.75rem',
          padding: '1.5rem',
        }}
      >
        <Typography
          variant="body2"
          color={palette.neutrals[600]}
          textAlign="center"
        >
          Nao foi possivel carregar as metricas do painel.
        </Typography>
      </Paper>
    );
  }

  return (
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
        const metric = getMetricValue(data, config.key);

        return (
          <MetricCard
            key={config.key}
            testId={`dashboard-metric-card-${config.key}`}
            iconName={config.iconName}
            iconTheme={config.iconTheme}
            label={config.label}
            value={metric.value}
            variationPercentage={metric.variationPercentage}
            trend={metric.trend}
          />
        );
      })}
    </Box>
  );
};
