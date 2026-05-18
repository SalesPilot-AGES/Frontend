import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDashboardAvgDuration } from '@store/hooks/useDashboardAvgDuration';
import type { JSX } from 'react';
import { useMemo } from 'react';

import { formatDuration, formatMonthLabel } from './AvgDurationLineChart.utils';

type TChartYBounds = {
  min: number;
  max: number;
};

const resolveYBounds = (values: number[]): TChartYBounds => {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  if (minValue === maxValue) {
    const padding = Math.max(1, minValue * 0.2);
    return {
      min: Math.max(0, Number((minValue - padding).toFixed(1))),
      max: Number((maxValue + padding).toFixed(1)),
    };
  }

  const range = maxValue - minValue;
  const padding = range * 0.15;

  return {
    min: Math.max(0, Number((minValue - padding).toFixed(1))),
    max: Number((maxValue + padding).toFixed(1)),
  };
};

export const AvgDurationLineChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { data = [], isLoading, isError } = useDashboardAvgDuration();

  const chartData = useMemo(
    () =>
      data.map((point) => ({
        monthLabel: point.monthLabel,
        avgMinutes: Number(point.avgMinutes.toFixed(1)),
      })),
    [data]
  );

  const yBounds = useMemo<TChartYBounds>(() => {
    if (chartData.length === 0) {
      return { min: 0, max: 10 };
    }

    return resolveYBounds(chartData.map((point) => point.avgMinutes));
  }, [chartData]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${palette.neutrals[200]}`,
        borderRadius: '1rem',
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h4">Duração média das reuniões</Typography>
        </Stack>

        {isLoading ? (
          <Box
            sx={{
              minHeight: '18rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={28} />
          </Box>
        ) : isError ? (
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '18rem' }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Não foi possível carregar o gráfico
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Tente novamente em instantes.
            </Typography>
          </Stack>
        ) : chartData.length === 0 ? (
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '18rem' }}
          >
            <Box
              sx={{
                backgroundColor: palette.primary[100],
                color: palette.primary[500],
                width: 56,
                height: 56,
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShowChartOutlinedIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Sem dados de duração média no momento
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Assim que houver reuniões consolidadas, o gráfico será exibido
              aqui.
            </Typography>
          </Stack>
        ) : (
          <LineChart
            height={320}
            margin={{ top: 24, right: 24, bottom: 24, left: 50 }}
            grid={{ horizontal: true }}
            slotProps={{
              tooltip: {
                sx: {
                  '& .MuiChartsTooltip-table caption': {
                    textAlign: 'right',
                  },
                },
              },
            }}
            xAxis={[
              {
                id: 'months',
                scaleType: 'point',
                data: chartData.map((point) => point.monthLabel),
                valueFormatter: (value, context) =>
                  context.location === 'tooltip'
                    ? formatMonthLabel(value)
                    : value,
              },
            ]}
            yAxis={[
              {
                min: yBounds.min,
                max: yBounds.max,
                valueFormatter: (value: number) => `${value} min`,
              },
            ]}
            series={[
              {
                id: 'avg-duration',
                data: chartData.map((point) => point.avgMinutes),
                color: palette.meetings[500],
                curve: 'linear',
                showMark: true,
                valueFormatter: (value: number | null) =>
                  value == null ? '' : formatDuration(value),
              },
            ]}
            sx={{
              '.MuiMarkElement-root': {
                stroke: palette.meetings[500],
                strokeWidth: 2,
                fill: palette.meetings[500],
              },
              '.MuiMarkElement-root[data-highlighted="true"]': {
                stroke: palette.meetings[500],
                fill: palette.meetings[500],
                strokeWidth: 3,
              },
            }}
          />
        )}
      </Stack>
    </Paper>
  );
};
