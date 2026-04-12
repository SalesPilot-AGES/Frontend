import { EStatus } from '@data/enums/EStatus';
import type { IStatusBadgeProps, TStatus } from '@declarations/ui';
import { Chip, useTheme } from '@mui/material';
import type { JSX } from 'react';

export const StatusBadge = ({ status, sx }: IStatusBadgeProps): JSX.Element => {
  const { palette } = useTheme();

  const statusConfig: Record<
    TStatus,
    {
      label: string;
      backgroundColor: string;
      color: string;
    }
  > = {
    [EStatus.ACTIVE]: {
      label: 'Ativo',
      backgroundColor: palette.success[100],
      color: palette.success[400],
    },
    [EStatus.INACTIVE]: {
      label: 'Inativo',
      backgroundColor: palette.neutrals[200],
      color: palette.neutrals[600],
    },
  };

  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      size="medium"
      sx={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        fontWeight: 600,
        borderRadius: '1rem',
        ...sx,
      }}
    />
  );
};
