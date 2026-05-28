import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Chip, type SxProps, useTheme } from '@mui/material';
import type { TDashboardMetricTrend } from '@services/models/DashboardSchema';
import type { JSX } from 'react';

export interface IInsightChipProps {
  variationPercentage: number;
  trend: TDashboardMetricTrend;
  sx?: SxProps;
}

const formatVariationLabel = (
  variationPercentage: number,
  trend: TDashboardMetricTrend
): string => {
  const absoluteValue = Math.abs(variationPercentage);

  if (trend === 'up') {
    return `+${absoluteValue}%`;
  }

  if (trend === 'down') {
    return `-${absoluteValue}%`;
  }

  return `${absoluteValue}%`;
};

export const InsightChip = ({
  variationPercentage,
  trend,
  sx,
}: IInsightChipProps): JSX.Element => {
  const { palette } = useTheme();

  const icon =
    trend === 'up' ? (
      <TrendingUpRoundedIcon fontSize="small" />
    ) : trend === 'down' ? (
      <TrendingDownRoundedIcon fontSize="small" />
    ) : (
      <TrendingFlatRoundedIcon fontSize="small" />
    );

  const colors =
    trend === 'up'
      ? {
          backgroundColor: palette.success[100],
          color: palette.success[400],
        }
      : trend === 'down'
        ? {
            backgroundColor: palette.error[100],
            color: palette.error[400],
          }
        : {
            backgroundColor: palette.neutrals[200],
            color: palette.neutrals[600],
          };

  return (
    <Chip
      icon={icon}
      label={formatVariationLabel(variationPercentage, trend)}
      size="small"
      sx={{
        ...colors,
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        width: '76.5px',
        height: '32px',
        '& .MuiChip-label': {
          px: '0.5rem',
          py: '0.25rem',
          color: 'inherit',
        },
        '& .MuiChip-icon': {
          marginLeft: '0.375rem',
          marginRight: '-0.25rem',
          color: 'inherit',
          opacity: 1,
        },
        ...sx,
      }}
    />
  );
};
