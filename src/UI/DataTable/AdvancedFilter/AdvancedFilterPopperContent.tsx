import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  type Palette,
  Typography,
  useTheme,
} from '@mui/material';
import type { JSX } from 'react';

import type { FilterGroup } from '../../../types/ui';
import type { DataTableSurfaceColors } from '../useDataTable';

interface AdvancedFilterPopperContentProps {
  filteredGroups: FilterGroup[];
  tempSelected: Record<string, string[]>;
  onCheckboxChange: (groupId: string, value: string, checked: boolean) => void;
  onSelectAll: (groupId: string, options: { value: string }[]) => void;
  shouldShowSearch: boolean;
  searchTerm: string;
  surface: DataTableSurfaceColors;
  palette: Palette;
}

export const AdvancedFilterPopperContent = ({
  filteredGroups,
  tempSelected,
  onCheckboxChange,
  onSelectAll,
  shouldShowSearch,
  searchTerm,
  surface,
  palette,
}: AdvancedFilterPopperContentProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 2,
        pt: shouldShowSearch ? 1 : 2,
      }}
    >
      {filteredGroups.map((group, index) => (
        <Box key={group.id} sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              fontWeight={600}
            >
              {group.label}
            </Typography>
            <Button
              size="small"
              onClick={() => onSelectAll(group.id, group.options)}
              sx={{
                textTransform: 'none',
                fontSize: '0.7rem',
                minWidth: 'auto',
                p: 0.5,
                color: palette.primary.main,
              }}
            >
              {tempSelected[group.id]?.length === group.options.length
                ? 'Desmarcar todos'
                : 'Selecionar todos'}
            </Button>
          </Box>
          <FormGroup>
            {group.options.map((option) => (
              <FormControlLabel
                key={option.id || option.value}
                control={
                  <Checkbox
                    checked={
                      tempSelected[group.id]?.includes(option.value) || false
                    }
                    onChange={(e) =>
                      onCheckboxChange(group.id, option.value, e.target.checked)
                    }
                    size="small"
                    sx={{
                      color: surface.filterMuted,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={option.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    color: surface.bodyText,
                  },
                  ml: -0.5,
                }}
              />
            ))}
          </FormGroup>
          {index < filteredGroups.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}

      {/* Mensagem quando não há resultados na busca */}
      {shouldShowSearch &&
        filteredGroups.length === 0 &&
        searchTerm.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Nenhum filtro encontrado para "{searchTerm}"
            </Typography>
          </Box>
        )}
    </Box>
  );
};
