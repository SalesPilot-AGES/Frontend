import type { TPlan } from '@declarations/ui';
import type { SxProps } from '@mui/material';
import type { JSX } from 'react';

import { StyledPlanBadge } from './PlanBadge.style';

export interface IPlanBadgeProps {
  plan: TPlan;
  sx?: SxProps;
}

export const PlanBadge = ({ plan, sx }: IPlanBadgeProps): JSX.Element => {
  return (
    <StyledPlanBadge
      plan={plan}
      label={plan}
      size="medium"
      sx={{ width: 'fit-content', ...sx }}
    />
  );
};
