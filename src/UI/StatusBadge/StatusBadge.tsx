import { EStatus } from '@data/enums/EStatus';
import type { IStatusBadgeProps } from '@declarations/ui';
import type { JSX } from 'react';

import { StyledStatusBadge } from './StatusBadge.style';

export const StatusBadge = ({ active, sx }: IStatusBadgeProps): JSX.Element => {
  return (
    <StyledStatusBadge
      active={active}
      label={active ? EStatus.ACTIVE : EStatus.INACTIVE}
      size="medium"
      sx={{ width: 'fit-content', ...sx }}
    />
  );
};
