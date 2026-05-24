import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import type { TDashboardPeriodParams } from '@services/models/DashboardSchema';
import { useGetMeetingsByMonth } from '@services/queries/useDashboard';
import { EmptyState } from '@UI/EmptyState/EmptyState';
import type { JSX } from 'react';
import { useMemo } from 'react';

import { useDashboardFilterContext } from '../../context/DashboardFilterContext';

const EMPTY_STATE_TITLE = 'Nenhuma reunião encontrada';
const EMPTY_STATE_DESCRIPTION =
  'Não há dados de reuniões para o período selecionado.';

export const MeetingsByMonthChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data = [], isLoading } = useGetMeetingsByMonth({
    period: filters.period as TDashboardPeriodParams['period'],
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        monthLabel: item.monthLabel,
        totalMeetings: item.total,
      })),
    [data]
  );

  const maxValue = useMemo(
    () => Math.max(0, ...chartData.map((item) => item.totalMeetings)),
    [chartData]
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '1rem',
        border: '1px solid',
        borderColor: palette.neutrals[200],
        backgroundColor: palette.neutrals.baseWhite,
        p: '1.5rem 1.5rem 0.0625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Total de reuniões
      </Typography>

      <Box sx={{ width: '100%', height: '20rem', overflow: 'hidden' }}>
        {isLoading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Carregando gráfico...
            </Typography>
          </Box>
        ) : chartData.length === 0 ? (
          <EmptyState
            title={EMPTY_STATE_TITLE}
            description={EMPTY_STATE_DESCRIPTION}
          />
        ) : (
          <BarChart
            height={320}
            margin={{ top: 10, right: 16, bottom: 32, left: 52 }}
            grid={{ horizontal: true }}
            xAxis={[
              {
                scaleType: 'band',
                data: chartData.map((item) => item.monthLabel),
                tickLabelStyle: {
                  fontSize: 12,
                  fill: palette.neutrals[500],
                },
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: maxValue || 1,
                tickMinStep: 1,
                tickLabelStyle: {
                  fontSize: 12,
                  fill: palette.neutrals[500],
                },
              },
            ]}
            series={[
              {
                data: chartData.map((item) => item.totalMeetings),
                color: palette.meetings[500],
                valueFormatter: (value, context): string => {
                  const month = chartData[context.dataIndex]?.monthLabel ?? '';
                  return `${month}: ${value ?? 0} reuniões`;
                },
              },
            ]}
            slots={{ legend: () => null }}
          />
        )}
      </Box>
    </Paper>
  );
};
