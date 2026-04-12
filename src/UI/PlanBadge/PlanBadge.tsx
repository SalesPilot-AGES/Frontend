import { EPlan } from '@data/enums/EPlan';
import type { IPlanBadgeProps, TPlan } from '@declarations/ui';
import { Chip, useTheme } from '@mui/material';
import type { JSX } from 'react';

export const PlanBadge = ({ plan, sx }: IPlanBadgeProps): JSX.Element => {
  const { palette } = useTheme();

  const planConfig: Record<
    TPlan,
    {
      label: string;
      background: string;
      color: string;
    }
  > = {
    [EPlan.BASIC]: {
      label: 'Básico',
      background: palette.neutrals[200],
      color: palette.neutrals[600],
    },
    [EPlan.PRO]: {
      label: 'Pro',
      background: palette.primary[100],
      color: palette.primary[500],
    },
    [EPlan.ENTERPRISE]: {
      label: 'Enterprise',
      background: `linear-gradient(90deg, ${palette.primary[700]} 0%, ${palette.primary[500]} 100%)`,
      color: palette.neutrals[100],
    },
  };

  const config = planConfig[plan];

  return (
    <Chip
      label={config.label}
      size="medium"
      sx={{
        background: config.background,
        color: config.color,
        fontWeight: 600,
        borderRadius: '1rem',
        ...sx,
      }}
    />
  );
};
