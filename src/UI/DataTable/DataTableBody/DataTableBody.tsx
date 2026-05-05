import EastRoundedIcon from '@mui/icons-material/EastRounded';
import {
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';

import type { DataTableColumn } from '../../../types/ui';
import { DataTableBodyCell } from '../DataTableBodyCell/DataTableBodyCell';
import { DataTableEmptyState } from '../DataTableEmptyState/DataTableEmptyState';
import {
  buildSkeletonWidths,
  type DataTableSurfaceColors,
  ROWS_PER_PAGE,
} from '../useDataTable';

export interface DataTableBodyProps<T> {
  columns: DataTableColumn<T>[];
  loading: boolean;
  data: T[];
  getRowId: (row: T) => string | number;
  onDetailsClick: (id: string | number) => void;
  emptyTitle: string;
  emptyDescription: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
  infiniteScroll?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const DataTableBody = <T,>({
  columns,
  loading,
  data,
  getRowId,
  onDetailsClick,
  emptyTitle,
  emptyDescription,
  surface,
  palette,
  infiniteScroll,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: DataTableBodyProps<T>): JSX.Element => {
  const skeletonWidths = buildSkeletonWidths(columns.length);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (!infiniteScroll || !tableBodyRef.current) return;

    const handleScroll = (): void => {
      if (
        tableBodyRef.current &&
        tableBodyRef.current.parentElement &&
        tableBodyRef.current.parentElement.scrollTop +
          tableBodyRef.current.parentElement.clientHeight >=
          tableBodyRef.current.parentElement.scrollHeight - 20 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage?.();
      }
    };

    const parentElement = tableBodyRef.current.parentElement;
    parentElement?.addEventListener('scroll', handleScroll);

    return (): void => {
      parentElement?.removeEventListener('scroll', handleScroll);
    };
  }, [infiniteScroll, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const bodyCellSx = {
    borderBottom: `1px solid ${surface.divider}`,
    borderLeft: 'none',
    borderRight: 'none',
    backgroundColor: palette.neutrals.baseWhite,
    py: 2,
    px: 2,
    verticalAlign: 'middle' as const,
  };

  return (
    <TableBody ref={tableBodyRef}>
      {loading ? (
        Array.from({ length: ROWS_PER_PAGE }).map((_, rowIndex) => (
          <TableRow
            key={`skeleton-${rowIndex}`}
            data-testid="datatable-loading-row"
          >
            {columns.map((column, columnIndex) => (
              <TableCell
                key={`${column.header}-skeleton`}
                align={column.align ?? 'left'}
                sx={bodyCellSx}
              >
                <Skeleton
                  variant={column.variant === 'badge' ? 'rounded' : 'text'}
                  width={skeletonWidths[columnIndex]}
                  height={column.variant === 'badge' ? 28 : 18}
                />
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{
                ...bodyCellSx,
                position: 'sticky',
                right: 0,
                zIndex: 2,
                minWidth: 120,
                width: 120,
              }}
            >
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ display: 'inline-flex' }}
              />
            </TableCell>
          </TableRow>
        ))
      ) : data.length > 0 ? (
        <>
          {data.map((row) => {
            const rowId = getRowId(row);

            return (
              <TableRow
                key={String(rowId)}
                hover
                sx={{
                  '&:hover td': {
                    backgroundColor: surface.rowHoverBg,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.header}
                    align={column.align ?? 'left'}
                    sx={bodyCellSx}
                  >
                    <DataTableBodyCell
                      row={row}
                      column={column}
                      palette={palette}
                      bodyTextColor={surface.bodyText}
                    />
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    ...bodyCellSx,
                    position: 'sticky',
                    right: 0,
                    zIndex: 1,
                    minWidth: 120,
                    width: 120,
                  }}
                >
                  <IconButton
                    aria-label={`Ver detalhes de ${String(rowId)}`}
                    onClick={() => onDetailsClick(rowId)}
                    size="small"
                    sx={{
                      color: surface.detailsAction,
                      p: 0.5,
                      '&:hover': { backgroundColor: 'transparent' },
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                  >
                    <EastRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          {infiniteScroll && hasNextPage && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                style={{ textAlign: 'center', padding: '1rem' }}
              >
                {isFetchingNextPage ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button onClick={() => fetchNextPage?.()}>
                    Carregar mais
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </>
      ) : (
        <DataTableEmptyState
          colSpan={columns.length + 1}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyStateIconBg={surface.emptyStateIconBg}
          emptyStateIconFg={surface.emptyStateIconFg}
        />
      )}
    </TableBody>
  );
};
