import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import type { Palette, SxProps, Theme } from '@mui/material';
import { InputAdornment, TextField } from '@mui/material';
import type { JSX } from 'react';

import type { DataTableSurfaceColors } from '../useDataTable';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
  sx?: SxProps<Theme>;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
  surface,
  palette,
  sx,
}: SearchInputProps): JSX.Element => {
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
    '& .MuiInputBase-input': {
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
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(event) => onChange?.(event.target.value)}
      size="small"
      fullWidth
      inputProps={{ 'aria-label': ariaLabel }}
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
  );
};
