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
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import { useGetMeetingsByCompany } from '@services/queries/useDashboard';
import { EmptyState } from '@UI/EmptyState/EmptyState';
import { type JSX, useMemo } from 'react';

const CHART_HEIGHT = 300;
const X_AXIS_STEP = 25;

const roundUpToStep = (value: number, step: number): number =>
  Math.ceil(value / step) * step;

const cardStyles = {
  width: '100%',
  border: '1px solid',
  borderColor: 'divider',
  padding: '1.75rem 1.5rem 1.25rem',
  boxSizing: 'border-box',
};

export const MeetingsByCompanyChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();

  const { data = [], isError, isLoading } = useGetMeetingsByCompany(filters);

  const maxMeetings = useMemo(() => {
    if (data.length === 0) {
      return 0;
    }

    return Math.max(...data.map((item) => item.total_meetings));
  }, [data]);

  const hasData = data.length > 0;
  const xAxisMax =
    maxMeetings > 0 ? roundUpToStep(maxMeetings, X_AXIS_STEP) : X_AXIS_STEP;

  const xAxisTicks = useMemo(
    () =>
      Array.from(
        { length: Math.floor(xAxisMax / X_AXIS_STEP) + 1 },
        (_, index) => index * X_AXIS_STEP
      ),
    [xAxisMax]
  );

  return (
    <Paper elevation={0} sx={cardStyles}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Reuniões por empresa
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
          title="Não foi possível carregar o gráfico"
          description="Tente novamente em alguns instantes."
          iconBg={palette.error[100]}
          iconColor={palette.error[600]}
        />
      )}

      {!isLoading && !isError && !hasData && (
        <EmptyState
          title="Sem reuniões no período"
          description="Não há dados para exibir neste filtro."
          iconBg={palette.companies[100]}
          iconColor={palette.companies[600]}
        />
      )}

      {!isLoading && !isError && hasData && (
        <BarChart
          borderRadius={6}
          dataset={data}
          layout="horizontal"
          margin={{ top: 6, right: 12, bottom: 28, left: 12 }}
          grid={{ vertical: true }}
          yAxis={[
            {
              scaleType: 'band',
              dataKey: 'company_name',
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
              dataKey: 'total_meetings',
              color: palette.companies[500],
              valueFormatter: (value, context): string => {
                const companyName = data[context.dataIndex]?.company_name ?? '';
                const totalMeetings = value ?? 0;
                return `${companyName}: ${totalMeetings} reuniões`;
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
