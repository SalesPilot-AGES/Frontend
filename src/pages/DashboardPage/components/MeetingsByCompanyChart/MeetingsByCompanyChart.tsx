import { useTheme } from '@mui/material';
import { useDashboardFilterContext } from '@pages/DashboardPage/context/DashboardFilterContext';
import type { TRankedBarChartItem } from '@services/models/DashboardSchema';
import { useGetMeetingsByCompany } from '@services/queries/useDashboard';
import { type JSX, useMemo } from 'react';

import { RankedBarChart } from '../RankedBarChart/RankedBarChart';

export const MeetingsByCompanyChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters } = useDashboardFilterContext();
  const { data = [], isError, isLoading } = useGetMeetingsByCompany(filters);

  const chartData = useMemo<TRankedBarChartItem[]>(
    () =>
      data.map((item) => ({
        label: item.company_name,
        value: item.total_meetings,
      })),
    [data]
  );

  return (
    <RankedBarChart
      title="Reuniões por empresa"
      data={chartData}
      barColor={palette.companies[500]}
      isLoading={isLoading}
      isError={isError}
      emptyStateIconBg={palette.companies[100]}
      emptyStateIconColor={palette.companies[600]}
      emptyStateTitle="Sem reuniões no período"
      emptyStateDescription="Não há dados para exibir neste filtro."
    />
  );
};
