import { EAvgDurationLineChart } from '@data/enums/EAvgDurationLineChart';
import { ECardLabel } from '@data/enums/ECardLabel';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useDashboardAvgDuration } from '@store/hooks/useDashboardAvgDuration';
import type { JSX } from 'react';
import { useMemo } from 'react';

import { useDashboardFilterContext } from '../../useDashboardFilterContext';
import { StyledLineChart } from './AvgDurationLineChart.style';
import { formatDuration, formatMonthLabel } from './AvgDurationLineChart.utils';
import {
  resolveYBounds,
  type TChartYBounds,
} from './AvgDurationLineChart.yBounds.utils';

export const AvgDurationLineChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { period } = useDashboardFilterContext();
  const { data = [], isLoading, isError } = useDashboardAvgDuration(period);

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
          <Typography variant="h4">
            {ECardLabel.AVERAGE_MEETINGS_DURATION}
          </Typography>
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
              {EAvgDurationLineChart.ERROR_TITLE}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {EAvgDurationLineChart.ERROR_DESCRIPTION}
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
              {EAvgDurationLineChart.EMPTY_TITLE}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {EAvgDurationLineChart.EMPTY_DESCRIPTION}
            </Typography>
          </Stack>
        ) : (
          <StyledLineChart
            lineColor={palette.meetings[500]}
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
          />
        )}
      </Stack>
    </Paper>
  );
};
