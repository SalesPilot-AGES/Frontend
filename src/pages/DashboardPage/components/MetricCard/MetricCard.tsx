import type { TColorThemeOptions } from '@declarations/hooks';
import type { TIconName } from '@declarations/ui';
import {
  Paper,
  Stack,
  type SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import type {
  TDashboardMetric,
  TDashboardMetricTrend,
} from '@services/models/DashboardSchema';
import { IconBox } from '@UI/IconBox/IconBox';
import type { JSX } from 'react';

import { InsightChip } from '../InsightChip/InsightChip';

export interface IMetricCardProps {
  iconName: TIconName;
  iconTheme: TColorThemeOptions;
  label: string;
  value: number;
  variationPercentage: TDashboardMetric['variationPercentage'];
  trend: TDashboardMetricTrend;
  sx?: SxProps;
  testId?: string;
}

export const MetricCard = ({
  iconName,
  iconTheme,
  label,
  value,
  variationPercentage,
  trend,
  sx,
  testId,
}: IMetricCardProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Paper
      data-testid={testId}
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: palette.neutrals[200],
        borderRadius: '0.75rem',
        padding: '1.5rem',
        backgroundColor: palette.neutrals.baseWhite,
        ...sx,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconBox
            iconName={iconName}
            theme={iconTheme}
            sx={{ width: '48px', height: '48px' }}
          />
          <InsightChip
            variationPercentage={variationPercentage}
            trend={trend}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography
            component="p"
            fontSize="1.75rem"
            fontWeight={700}
            lineHeight={1.2}
            color={palette.neutrals[900]}
          >
            {value}
          </Typography>
          <Typography
            component="p"
            fontSize="0.875rem"
            fontWeight={400}
            lineHeight={1.4}
            color={palette.neutrals[600]}
          >
            {label}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
