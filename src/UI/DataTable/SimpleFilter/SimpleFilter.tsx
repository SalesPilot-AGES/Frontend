import type { Palette, SxProps, Theme } from '@mui/material';
import { MenuItem, TextField, Typography } from '@mui/material';
import type { JSX } from 'react';

import type { DataTableFilterOption } from '../../../types/ui';
import type { DataTableSurfaceColors } from '../useDataTable';

interface SimpleFilterProps {
  value?: string;
  onChange?: (value: string) => void;
  options: DataTableFilterOption[];
  placeholder: string;
  ariaLabel: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
  sx?: SxProps<Theme>;
}

export const SimpleFilter = ({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  surface,
  palette,
  sx,
}: SimpleFilterProps): JSX.Element => {
  const pillControlSx: SxProps<Theme> = {
    flex: 1,
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 999,
      backgroundColor: (palette.neutrals?.baseWhite as string) || '#fff',
      '& fieldset': { borderColor: surface.divider },
      '&:hover fieldset': {
        borderColor: (palette.neutrals?.[300] as string) || '#e0e0e0',
      },
      '&.Mui-focused fieldset': {
        borderWidth: 1,
        borderColor: (palette.neutrals?.[400] as string) || '#bdbdbd',
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
    ...sx,
  };

  return (
    <TextField
      select
      value={value ?? ''}
      onChange={(event) => onChange?.(event.target.value)}
      size="small"
      fullWidth
      SelectProps={{
        displayEmpty: true,
        inputProps: { 'aria-label': ariaLabel },
        renderValue: (selected) => {
          if (selected === '' || selected == null) {
            return (
              <Typography
                component="span"
                sx={{ color: surface.filterMuted, fontSize: '0.875rem' }}
              >
                {placeholder}
              </Typography>
            );
          }
          return (
            options.find((opt) => opt.value === selected)?.label ??
            String(selected)
          );
        },
      }}
      sx={pillControlSx}
    >
      {options.map((opt) => (
        <MenuItem
          key={opt.value === '' ? '__all' : opt.value}
          value={opt.value}
        >
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
