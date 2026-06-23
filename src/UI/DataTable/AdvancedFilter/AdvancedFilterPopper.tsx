import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  type Palette,
  Paper,
  Popper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import type { JSX } from 'react';

import type { FilterGroup } from '../../../types/ui';
import type { DataTableSurfaceColors } from '../useDataTable';
import { AdvancedFilterPopperContent } from './AdvancedFilterPopperContent';

interface AdvancedFilterPopperProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  label: string;
  shouldShowSearch: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredGroups: FilterGroup[];
  tempSelected: Record<string, string[]>;
  onCheckboxChange: (groupId: string, value: string, checked: boolean) => void;
  onSelectAll: (groupId: string, options: { value: string }[]) => void;
  onClear: () => void;
  surface: DataTableSurfaceColors;
  palette: Palette;
}

export const AdvancedFilterPopper = ({
  open,
  anchorEl,
  onClose,
  label,
  shouldShowSearch,
  searchTerm,
  onSearchChange,
  filteredGroups,
  tempSelected,
  onCheckboxChange,
  onSelectAll,
  onClear,
  surface,
  palette,
}: AdvancedFilterPopperProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{ zIndex: theme.zIndex.modal }}
      modifiers={[
        { name: 'offset', options: { offset: [0, 4] } },
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            padding: 8,
          },
        },
      ]}
    >
      <Paper
        elevation={3}
        sx={{
          width: 340,
          maxHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '12px',
          border: `1px solid ${surface.divider}`,
          backgroundColor: (palette.neutrals?.baseWhite as string) || '#fff',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${surface.divider}`,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={surface.bodyText}
          >
            {label}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <FilterListRoundedIcon
              fontSize="small"
              sx={{ color: surface.filterMuted }}
            />
          </IconButton>
        </Box>

        {/* Search dentro do filtro - só aparece com 3+ grupos */}
        {shouldShowSearch && (
          <Box sx={{ p: 2, pb: 1 }}>
            <TextField
              size="small"
              placeholder="Buscar filtros..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon
                      sx={{ color: surface.filterMuted, fontSize: 18 }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '8px',
                  backgroundColor:
                    (palette.neutrals?.baseWhite as string) || '#f5f5f5',
                  '& fieldset': {
                    borderColor: surface.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: palette.neutrals?.[300] || '#e0e0e0',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Conteúdo dos filtros */}
        <AdvancedFilterPopperContent
          filteredGroups={filteredGroups}
          tempSelected={tempSelected}
          onCheckboxChange={onCheckboxChange}
          onSelectAll={onSelectAll}
          shouldShowSearch={shouldShowSearch}
          searchTerm={searchTerm}
          surface={surface}
          palette={palette}
        />

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `1px solid ${surface.divider}`,
            backgroundColor:
              (palette.neutrals?.baseWhite as string) || '#f5f5f5',
          }}
        >
          <Button
            variant="text"
            color="inherit"
            onClick={onClear}
            size="small"
            sx={{
              textTransform: 'none',
              color: surface.filterMuted,
              '&:hover': {
                color: surface.bodyText,
                backgroundColor: 'transparent',
              },
            }}
          >
            Limpar filtros
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            size="small"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
            }}
          >
            Aplicar
          </Button>
        </Box>
      </Paper>
    </Popper>
  );
};
