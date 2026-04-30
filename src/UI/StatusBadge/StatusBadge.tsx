import { EStatus } from '@data/enums/EStatus';
import type { SxProps } from '@mui/material';
import type { JSX } from 'react';

import { StyledStatusBadge } from './StatusBadge.style';

export interface IStatusBadgeProps {
  active: boolean;
  sx?: SxProps;
}

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
