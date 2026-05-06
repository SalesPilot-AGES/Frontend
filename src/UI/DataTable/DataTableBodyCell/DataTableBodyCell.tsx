import { Box, Chip, Stack, Typography } from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { JSX, ReactNode } from 'react';

import type { DataTableColumn } from '../../../types/ui';
import {
  chipLookFromValue,
  resolveBadgeColor,
  resolveCellIconColor,
  resolveCellValue,
} from '../useDataTable';

export interface IDataTableBodyCellProps<T> {
  row: T;
  column: DataTableColumn<T>;
  palette: Palette;
  bodyTextColor: string;
}

export const DataTableBodyCell = <T,>({
  row,
  column,
  palette,
  bodyTextColor,
}: IDataTableBodyCellProps<T>): JSX.Element => {
  const value: ReactNode = resolveCellValue(row, column.accessor);

  if (column.render) {
    return <>{column.render(value, row)}</>;
  }

  if (column.variant === 'badge') {
    const badgeColor = resolveBadgeColor(value, row, column);
    const look = chipLookFromValue(value, badgeColor, palette);

    return (
      <Chip
        label={String(value ?? '-')}
        size="small"
        sx={{
          ...look,
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          height: 24,
          textTransform: 'capitalize',
          '& .MuiChip-label': {
            px: 1.25,
          },
        }}
      />
    );
  }

  const iconTint = resolveCellIconColor(palette, column.iconColor);

  return (
    <Stack alignItems="center" direction="row" spacing={1.25}>
      {column.icon ? (
        <Box
          sx={{
            display: 'inline-flex',
            color: iconTint,
            lineHeight: 0,
            '& .MuiSvgIcon-root': { fontSize: 18 },
          }}
        >
          {column.icon}
        </Box>
      ) : null}
      <Typography
        variant="body2"
        sx={{
          color: bodyTextColor,
          fontSize: '0.875rem',
          fontWeight: column.icon ? 500 : 400,
        }}
      >
        {value ?? '-'}
      </Typography>
    </Stack>
  );
};
