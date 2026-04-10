import { Paper, Table, TableContainer, useTheme } from '@mui/material';
import type { JSX } from 'react';

import type { DataTableProps } from './DataTable';
import { getDataTableSurfaceColors } from './DataTable';
import { DataTableBody } from './DataTableBody/DataTableBody';
import { DataTableHead } from './DataTableHead/DataTableHead';
import { DataTableToolbar } from './DataTableToolbar/DataTableToolbar';

export const DataTable = <T,>({
  columns,
  data,
  getRowId,
  onDetailsClick,
  loading = false,
  emptyTitle = 'Nenhum registro encontrado',
  emptyDescription = 'Quando houver itens para exibir, eles aparecerão aqui.',
  sx,
  toolbarTitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  searchAriaLabel = 'Buscar',
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterPlaceholder = 'Filtrar...',
  filterAriaLabel = 'Filtro',
}: DataTableProps<T>): JSX.Element => {
  const { palette } = useTheme();
  const surface = getDataTableSurfaceColors(palette);

  const showSearch = onSearchChange != null;
  const showFilter = onFilterChange != null && filterOptions.length > 0;
  const showToolbar = Boolean(toolbarTitle) || showSearch || showFilter;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: palette.neutrals.baseWhite,
        border: `1px solid ${surface.paperBorder}`,
        borderRadius: '0.75rem',
        boxShadow: 'none',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {showToolbar ? (
        <DataTableToolbar
          toolbarTitle={toolbarTitle}
          showSearch={showSearch}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          searchAriaLabel={searchAriaLabel}
          showFilter={showFilter}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
          filterPlaceholder={filterPlaceholder}
          filterAriaLabel={filterAriaLabel}
          surface={surface}
          palette={palette}
        />
      ) : null}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table
          stickyHeader
          size="small"
          sx={{
            minWidth: 760,
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
            '& .MuiTableCell-root': { borderColor: surface.tableCellBorder },
          }}
        >
          <DataTableHead
            columns={columns}
            surface={surface}
            palette={palette}
          />
          <DataTableBody
            columns={columns}
            loading={loading}
            data={data}
            getRowId={getRowId}
            onDetailsClick={onDetailsClick}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            surface={surface}
            palette={palette}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;

export type {
  BadgeLook,
  DataTableAccessor,
  DataTableBadgeColor,
  DataTableColumn,
  DataTableFilterOption,
  DataTableIconColorTuple,
  DataTableProps,
  DataTableSurfaceColors,
} from './DataTable';
