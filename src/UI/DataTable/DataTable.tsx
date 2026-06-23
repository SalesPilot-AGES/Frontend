import { Paper, Table, TableContainer } from '@mui/material';
import type { JSX } from 'react';

import type { DataTableProps } from '../../types/ui';
import { DataTableBody } from './DataTableBody/DataTableBody';
import { DataTableHead } from './DataTableHead/DataTableHead';
import { DataTableToolbar } from './DataTableToolbar/DataTableToolbar';
import { useDataTable } from './useDataTable';

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
  searchPlaceholder = 'Buscar',
  searchAriaLabel = 'Buscar',
  filterType = 'simple',
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterPlaceholder = 'Filtrar',
  filterAriaLabel = 'Filtro',
  filterGroups = [],
  selectedFilters = {},
  onFilterChangeAdvanced,
  onClearFilters,
  filterLabel = 'Filtros',
  filterPlaceholderAdvanced = 'Filtrar',
  companyFilterValue,
  onCompanyFilterChange,
  companyFilterOptions = [],
  companyFilterPlaceholder = 'Filtrar por empresa',
  companyFilterAriaLabel = 'Filtrar por empresa',
  infiniteScroll,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: DataTableProps<T>): JSX.Element => {
  const { palette, surfaceColors } = useDataTable();

  const showSearch = onSearchChange != null;
  const showFilter =
    (filterType === 'simple' &&
      onFilterChange != null &&
      filterOptions.length > 0) ||
    (filterType === 'advanced' &&
      onFilterChangeAdvanced != null &&
      filterGroups.length > 0);
  const showCompanyFilter =
    onCompanyFilterChange != null && companyFilterOptions.length > 0;
  const showToolbar =
    Boolean(toolbarTitle) || showSearch || showFilter || showCompanyFilter;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: palette.common.white,
        border: `1px solid ${surfaceColors.paperBorder}`,
        borderRadius: '0.75rem',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
        width: '100%',
        ...sx,
      }}
    >
      {showToolbar && (
        <DataTableToolbar
          toolbarTitle={toolbarTitle}
          showSearch={showSearch}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          searchAriaLabel={searchAriaLabel}
          filterType={filterType}
          showFilter={showFilter}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
          filterPlaceholder={filterPlaceholder}
          filterAriaLabel={filterAriaLabel}
          filterGroups={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChangeAdvanced={onFilterChangeAdvanced}
          onClearFilters={onClearFilters}
          filterLabel={filterLabel}
          filterPlaceholderAdvanced={filterPlaceholderAdvanced}
          showCompanyFilter={showCompanyFilter}
          companyFilterValue={companyFilterValue}
          onCompanyFilterChange={onCompanyFilterChange}
          companyFilterOptions={companyFilterOptions}
          companyFilterPlaceholder={companyFilterPlaceholder}
          companyFilterAriaLabel={companyFilterAriaLabel}
          surface={surfaceColors}
          palette={palette}
        />
      )}
      <TableContainer
        sx={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          maxWidth: '100%',
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{
            minWidth: 760,
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
            '& .MuiTableCell-root': {
              borderColor: surfaceColors.tableCellBorder,
            },
          }}
        >
          <DataTableHead
            columns={columns}
            surface={surfaceColors}
            palette={palette}
            showDetailsColumn={Boolean(onDetailsClick)}
          />
          <DataTableBody
            columns={columns}
            loading={loading}
            data={data}
            getRowId={getRowId}
            onDetailsClick={onDetailsClick}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            surface={surfaceColors}
            palette={palette}
            infiniteScroll={infiniteScroll}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
