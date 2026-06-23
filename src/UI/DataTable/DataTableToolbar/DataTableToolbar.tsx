import { Box, Stack, Typography } from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { JSX } from 'react';

import type {
  DataTableFilterOption,
  FilterGroup,
  FilterType,
} from '../../../types/ui';
import { AdvancedFilter } from '../AdvancedFilter/AdvancedFilter';
import { SearchInput } from '../SearchInput/SearchInput';
import { SimpleFilter } from '../SimpleFilter/SimpleFilter';
import type { DataTableSurfaceColors } from '../useDataTable';

export interface IDataTableToolbarProps {
  toolbarTitle?: string;
  showSearch: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  filterType?: FilterType;
  showFilter: boolean;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions: DataTableFilterOption[];
  filterPlaceholder: string;
  filterAriaLabel: string;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChangeAdvanced?: (groupId: string, selectedValues: string[]) => void;
  onClearFilters?: () => void;
  filterLabel?: string;
  filterPlaceholderAdvanced?: string;
  showCompanyFilter: boolean;
  companyFilterValue?: string;
  onCompanyFilterChange?: (value: string) => void;
  companyFilterOptions: DataTableFilterOption[];
  companyFilterPlaceholder: string;
  companyFilterAriaLabel: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
}

export const DataTableToolbar = ({
  toolbarTitle,
  showSearch,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  filterType = 'simple',
  showFilter,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
  filterAriaLabel,
  filterGroups = [],
  selectedFilters = {},
  onFilterChangeAdvanced,
  onClearFilters,
  filterLabel = 'Filtros',
  filterPlaceholderAdvanced = 'Filtrar',
  showCompanyFilter,
  companyFilterValue,
  onCompanyFilterChange,
  companyFilterOptions,
  companyFilterPlaceholder,
  companyFilterAriaLabel,
  surface,
  palette,
}: IDataTableToolbarProps): JSX.Element => {
  const isAdvancedFilter =
    filterType === 'advanced' &&
    filterGroups.length > 0 &&
    onFilterChangeAdvanced;
  const isSimpleFilter =
    filterType === 'simple' && showFilter && onFilterChange;

  const visibleFilters = [
    showSearch,
    isSimpleFilter || isAdvancedFilter,
    showCompanyFilter && companyFilterOptions.length > 0,
  ].filter(Boolean).length;

  const getFilterWidth = (): string => {
    if (visibleFilters <= 1) {
      return '100%';
    }
    return `${100 / visibleFilters}%`;
  };

  return (
    <Box
      sx={{
        px: 2.5,
        pt: 2.5,
        pb: 2,
        borderBottom: `1px solid ${surface.divider}`,
      }}
    >
      {toolbarTitle && (
        <Typography
          component="h2"
          variant="h6"
          sx={{
            color: surface.bodyText,
            fontSize: '1.125rem',
            fontWeight: 600,
            mb: 2,
          }}
        >
          {toolbarTitle}
        </Typography>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={{ width: '100%' }}
      >
        {showSearch && (
          <Box sx={{ flex: 1, width: getFilterWidth() }}>
            <SearchInput
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
              ariaLabel={searchAriaLabel}
              surface={surface}
              palette={palette}
              sx={{ width: '100%' }}
            />
          </Box>
        )}

        {isSimpleFilter && (
          <Box sx={{ flex: 1, width: getFilterWidth() }}>
            <SimpleFilter
              value={filterValue}
              onChange={onFilterChange}
              options={filterOptions}
              placeholder={filterPlaceholder}
              ariaLabel={filterAriaLabel}
              surface={surface}
              palette={palette}
              sx={{ width: '100%' }}
            />
          </Box>
        )}

        {isAdvancedFilter && (
          <Box sx={{ flex: 1, width: getFilterWidth() }}>
            <AdvancedFilter
              groups={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChangeAdvanced}
              onClearFilters={() => onClearFilters && onClearFilters()}
              label={filterLabel}
              placeholder={filterPlaceholderAdvanced}
              surface={surface}
              palette={palette}
              sx={{ width: '100%' }}
            />
          </Box>
        )}

        {showCompanyFilter && companyFilterOptions.length > 0 && (
          <Box sx={{ flex: 1, width: getFilterWidth() }}>
            <SimpleFilter
              value={companyFilterValue}
              onChange={onCompanyFilterChange}
              options={companyFilterOptions}
              placeholder={companyFilterPlaceholder}
              ariaLabel={companyFilterAriaLabel}
              surface={surface}
              palette={palette}
              sx={{ width: '100%' }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
