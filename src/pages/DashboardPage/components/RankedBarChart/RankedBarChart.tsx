import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import type { TRankedBarChartItem } from '@services/models/DashboardSchema';
import { EmptyState } from '@UI/EmptyState/EmptyState';
import { type JSX, useMemo } from 'react';

const CHART_HEIGHT = 240;
const X_AXIS_STEP = 25;

const roundUpToStep = (value: number, step: number): number =>
  Math.ceil(value / step) * step;

type TRankedBarChartProps = {
  title: string;
  data: TRankedBarChartItem[];
  barColor: string;
  isLoading: boolean;
  isError: boolean;
  emptyStateIconBg: string;
  emptyStateIconColor: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  errorStateTitle?: string;
  errorStateDescription?: string;
  valueLabel?: string;
};

export const RankedBarChart = ({
  title,
  data,
  barColor,
  isLoading,
  isError,
  emptyStateIconBg,
  emptyStateIconColor,
  emptyStateTitle,
  emptyStateDescription,
  errorStateTitle = 'Não foi possível carregar o gráfico',
  errorStateDescription = 'Tente novamente em alguns instantes.',
  valueLabel = 'reuniões',
}: TRankedBarChartProps): JSX.Element => {
  const { palette } = useTheme();

  const hasData = data.length > 0;
  const maxValue = useMemo(
    () => (hasData ? Math.max(...data.map((item) => item.value)) : 0),
    [data, hasData]
  );

  const xAxisMax =
    maxValue > 0 ? roundUpToStep(maxValue, X_AXIS_STEP) : X_AXIS_STEP;

  const xAxisTicks = useMemo(
    () =>
      Array.from(
        { length: Math.floor(xAxisMax / X_AXIS_STEP) + 1 },
        (_, index) => index * X_AXIS_STEP
      ),
    [xAxisMax]
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        padding: '1.75rem 1.5rem 1.25rem',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        {title}
      </Typography>

      {isLoading && (
        <Box
          sx={{
            minHeight: CHART_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={28} />
        </Box>
      )}

      {!isLoading && isError && (
        <EmptyState
          title={errorStateTitle}
          description={errorStateDescription}
          iconBg={palette.error[100]}
          iconColor={palette.error[600]}
        />
      )}

      {!isLoading && !isError && !hasData && (
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          iconBg={emptyStateIconBg}
          iconColor={emptyStateIconColor}
        />
      )}

      {!isLoading && !isError && hasData && (
        <BarChart
          borderRadius={6}
          dataset={data}
          layout="horizontal"
          margin={{ top: 6, right: 12, bottom: 28, left: 12 }}
          grid={{ vertical: true }}
          hideLegend
          yAxis={[
            {
              scaleType: 'band',
              dataKey: 'label',
              width: 110,
              disableLine: true,
              disableTicks: true,
              categoryGapRatio: 0.35,
              barGapRatio: 0,
              tickLabelStyle: {
                fill: palette.neutrals[600],
                fontSize: 13,
              },
            },
          ]}
          xAxis={[
            {
              min: 0,
              max: xAxisMax,
              tickInterval: xAxisTicks,
              tickNumber: xAxisTicks.length,
              disableLine: true,
              disableTicks: true,
              tickLabelStyle: {
                fill: palette.neutrals[600],
                fontSize: 13,
              },
            },
          ]}
          series={[
            {
              dataKey: 'value',
              color: barColor,
              valueFormatter: (value, context): string => {
                const label = data[context.dataIndex]?.label ?? '';
                const total = value ?? 0;
                return `${label}: ${total} ${valueLabel}`;
              },
            },
          ]}
          slotProps={{
            tooltip: {
              trigger: 'item',
            },
          }}
          sx={{
            [`& .${chartsGridClasses.line}`]: {
              stroke: palette.neutrals[200],
              strokeWidth: 1,
            },
            [`& .${axisClasses.line}`]: {
              stroke: 'none',
            },
            [`& .${axisClasses.tick}`]: {
              stroke: 'none',
            },
          }}
          height={CHART_HEIGHT}
        />
      )}
    </Paper>
  );
};
