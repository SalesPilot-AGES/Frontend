import {
  Box,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { JSX } from 'react';

import type { DataTableColumn } from '../../../types/ui';
import {
  type DataTableSurfaceColors,
  formatHeaderMultiline,
  iconTupleToCss,
} from '../useDataTable';

export interface IDataTableHeadProps<T> {
  columns: DataTableColumn<T>[];
  surface: DataTableSurfaceColors;
  palette: Palette;
}

export const DataTableHead = <T,>({
  columns,
  surface,
  palette,
}: IDataTableHeadProps<T>): JSX.Element => {
  const headerCellSx = {
    backgroundColor: surface.headerBg,
    borderBottom: `1px solid ${surface.divider}`,
    borderLeft: 'none',
    borderRight: 'none',
    color: surface.headerText,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    py: 1.5,
    px: 2,
    textTransform: 'uppercase' as const,
    whiteSpace: 'normal' as const,
    verticalAlign: 'middle' as const,
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.header}
            align={column.align ?? 'left'}
            sx={{ ...headerCellSx, width: column.width }}
          >
            <Stack alignItems="center" direction="row" spacing={0.75}>
              {column.icon ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    color: column.iconColor
                      ? iconTupleToCss(column.iconColor)
                      : palette.neutrals[500],
                  }}
                >
                  {column.icon}
                </Box>
              ) : null}
              <Typography
                component="span"
                variant="caption"
                fontWeight={700}
                sx={{
                  color: 'inherit',
                  lineHeight: 1.25,
                  whiteSpace: 'pre-line',
                }}
              >
                {formatHeaderMultiline(column.header)}
              </Typography>
            </Stack>
          </TableCell>
        ))}
        <TableCell
          align="center"
          sx={{
            ...headerCellSx,
            position: 'sticky',
            right: 0,
            zIndex: 3,
            width: 120,
          }}
        >
          <Typography
            component="span"
            variant="caption"
            fontWeight={700}
            sx={{ color: 'inherit' }}
          >
            Detalhes
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
