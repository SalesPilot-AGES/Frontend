import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import type { SxProps, Theme } from '@mui/material';
import {
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { JSX } from 'react';

import type {
  DataTableFilterOption,
  DataTableSurfaceColors,
} from '../DataTable';

export interface DataTableToolbarProps {
  toolbarTitle?: string;
  showSearch: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  showFilter: boolean;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions: DataTableFilterOption[];
  filterPlaceholder: string;
  filterAriaLabel: string;
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
  showFilter,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
  filterAriaLabel,
  surface,
  palette,
}: DataTableToolbarProps): JSX.Element => {
  const pillControlSx: SxProps<Theme> = {
    flex: 1,
    minWidth: 0,
    maxWidth: { xs: '100%', sm: 'calc(50% - 8px)' },
    '& .MuiOutlinedInput-root': {
      borderRadius: 999,
      backgroundColor: palette.neutrals.baseWhite,
      '& fieldset': { borderColor: surface.divider },
      '&:hover fieldset': { borderColor: palette.neutrals[300] },
      '&.Mui-focused fieldset': {
        borderWidth: 1,
        borderColor: palette.neutrals[400],
      },
    },
    '& .MuiInputBase-input, & .MuiSelect-select': {
      fontSize: '0.875rem',
      py: 1.25,
    },
    '& .MuiInputBase-input::placeholder': {
      color: surface.filterMuted,
      opacity: 1,
    },
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
      {toolbarTitle ? (
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
      ) : null}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        {showSearch ? (
          <TextField
            placeholder={searchPlaceholder}
            value={searchValue ?? ''}
            onChange={(event) => onSearchChange?.(event.target.value)}
            size="small"
            fullWidth
            inputProps={{ 'aria-label': searchAriaLabel }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{ color: surface.filterMuted, fontSize: 20 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={pillControlSx}
          />
        ) : null}
        {showFilter ? (
          <TextField
            select
            value={filterValue ?? ''}
            onChange={(event) => onFilterChange?.(event.target.value)}
            size="small"
            fullWidth
            SelectProps={{
              displayEmpty: true,
              inputProps: { 'aria-label': filterAriaLabel },
              renderValue: (selected) => {
                if (selected === '' || selected == null) {
                  return (
                    <Typography
                      component="span"
                      sx={{ color: surface.filterMuted, fontSize: '0.875rem' }}
                    >
                      {filterPlaceholder}
                    </Typography>
                  );
                }
                return (
                  filterOptions.find((opt) => opt.value === selected)?.label ??
                  String(selected)
                );
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListRoundedIcon
                    sx={{ color: surface.filterMuted, fontSize: 20 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={pillControlSx}
          >
            {filterOptions.map((opt) => (
              <MenuItem
                key={opt.value === '' ? '__all' : opt.value}
                value={opt.value}
              >
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
      </Stack>
    </Box>
  );
};
