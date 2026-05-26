import { useTheme } from '@mui/material';
import type { TRankedBarChartItem } from '@services/models/DashboardSchema';
import { type JSX } from 'react';

import { RankedBarChart } from '../RankedBarChart/RankedBarChart';

interface MeetingsByChartProps {
  title: string;
  data: TRankedBarChartItem[];
  isLoading?: boolean;
  isError?: boolean;
  barColor?: string;
  emptyStateIconBg?: string;
  emptyStateIconColor?: string;
}

export const MeetingsByChart = ({
  title,
  data,
  isLoading = false,
  isError = false,
  barColor,
  emptyStateIconBg,
  emptyStateIconColor,
}: MeetingsByChartProps): JSX.Element => {
  const { palette } = useTheme();

  const finalBarColor = barColor ?? palette.companies[500];
  const finalEmptyStateIconBg = emptyStateIconBg ?? palette.companies[100];
  const finalEmptyStateIconColor =
    emptyStateIconColor ?? palette.companies[600];

  return (
    <RankedBarChart
      title={title}
      data={data}
      barColor={finalBarColor}
      isLoading={isLoading}
      isError={isError}
      emptyStateIconBg={finalEmptyStateIconBg}
      emptyStateIconColor={finalEmptyStateIconColor}
      emptyStateTitle="Sem reuniões no período"
      emptyStateDescription="Não há dados para exibir neste filtro."
    />
  );
};
