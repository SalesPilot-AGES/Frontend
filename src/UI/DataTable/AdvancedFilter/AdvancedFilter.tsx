import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import type { Palette, SxProps, Theme } from '@mui/material';
import { Badge, Box, Button, Typography, useTheme } from '@mui/material';
import type { JSX } from 'react';
import { useRef, useState } from 'react';

import type { FilterGroup } from '../../../types/ui';
import type { DataTableSurfaceColors } from '../useDataTable';
import { AdvancedFilterPopper } from './AdvancedFilterPopper';

interface AdvancedFilterProps {
  groups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, selectedValues: string[]) => void;
  onClearFilters: () => void;
  label?: string;
  placeholder?: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
  sx?: SxProps<Theme>;
}

export const AdvancedFilter = ({
  groups,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  label = 'Filtros',
  placeholder = 'Filtrar',
  surface,
  palette,
  sx,
}: AdvancedFilterProps): JSX.Element => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelected, setTempSelected] =
    useState<Record<string, string[]>>(selectedFilters);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const totalFilters = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const shouldShowSearch = groups.length >= 3;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setTempSelected(selectedFilters);
    setSearchTerm('');
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    Object.entries(tempSelected).forEach(([groupId, values]) => {
      onFilterChange(groupId, values);
    });
  };

  const handleClear = (): void => {
    setTempSelected({});
    onClearFilters();
    setAnchorEl(null);
  };

  const handleCheckboxChange = (
    groupId: string,
    value: string,
    checked: boolean
  ): void => {
    setTempSelected((prev) => {
      const current = prev[groupId] || [];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);

      if (updated.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [groupId]: removed, ...rest } = prev;
        return rest;
      }

      return { ...prev, [groupId]: updated };
    });
  };

  const handleSelectAll = (
    groupId: string,
    options: { value: string }[]
  ): void => {
    const allValues = options.map((opt) => opt.value);
    const currentValues = tempSelected[groupId] || [];

    if (currentValues.length === options.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [groupId]: removed, ...rest } = tempSelected;
      setTempSelected(rest);
    } else {
      setTempSelected((prev) => ({ ...prev, [groupId]: allValues }));
    }
  };

  const filteredGroups = shouldShowSearch
    ? groups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((group) => group.options.length > 0)
    : groups;

  const renderButton = (): JSX.Element => (
    <Box sx={{ width: '100%', ...sx }}>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        variant="outlined"
        size="small"
        fullWidth
        startIcon={
          <FilterListRoundedIcon
            sx={{ color: surface.filterMuted, fontSize: 20 }}
          />
        }
        sx={{
          borderRadius: 999,
          textTransform: 'none',
          justifyContent: 'space-between',
          borderColor: surface.divider,
          color:
            totalFilters > 0 ? theme.palette.primary.main : surface.filterMuted,
          backgroundColor: palette.neutrals?.baseWhite || '#fff',
          px: 2,
          py: 1.25,
          width: '100%',
          '&:hover': {
            borderColor: palette.neutrals?.[300] || '#e0e0e0',
            backgroundColor: palette.neutrals?.baseWhite || '#fff',
          },
          '& .MuiButton-startIcon': {
            marginRight: 1,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography
            component="span"
            sx={{
              color:
                totalFilters > 0
                  ? theme.palette.primary.main
                  : surface.filterMuted,
              fontSize: '0.875rem',
              fontWeight: totalFilters > 0 ? 500 : 400,
            }}
          >
            {placeholder}
          </Typography>
          {totalFilters > 0 && (
            <Badge
              badgeContent={totalFilters}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  position: 'relative',
                  transform: 'none',
                  fontSize: '0.65rem',
                  height: 18,
                  minWidth: 18,
                  ml: 1,
                },
              }}
            />
          )}
        </Box>
      </Button>
    </Box>
  );

  return (
    <>
      {renderButton()}
      <AdvancedFilterPopper
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        label={label}
        shouldShowSearch={shouldShowSearch}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredGroups={filteredGroups}
        tempSelected={tempSelected}
        onCheckboxChange={handleCheckboxChange}
        onSelectAll={handleSelectAll}
        onClear={handleClear}
        surface={surface}
        palette={palette}
      />
    </>
  );
};
