import type { IPlanBadgeProps } from '@declarations/ui';
import type { JSX } from 'react';

import { StyledPlanBadge } from './PlanBadge.style';

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
