import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  Button,
  Divider,
  Menu,
  Stack,
  type SxProps,
  TextField,
  type Theme,
  Typography,
  useTheme,
} from '@mui/material';
import type { TDashboardFilters } from '@services/models/DashboardSchema';
import type { JSX, MouseEvent } from 'react';
import { useMemo, useState } from 'react';

import { useDashboardFilterContext } from '../../context/DashboardFilterContext';

type TQuickPeriod = Extract<TDashboardFilters['period'], 'all' | '7d' | '30d'>;

type TQuickPeriodOption = {
  label: string;
  value: TQuickPeriod;
};

const quickPeriodOptions: readonly TQuickPeriodOption[] = [
  { label: 'Todas', value: 'all' },
  { label: '7 dias', value: '7d' },
  { label: '30 dias', value: '30d' },
];

const periodButtonSx = (isActive: boolean): SxProps<Theme> => ({
  height: '36px',
  minWidth: '4.25rem',
  px: '1rem',
  borderRadius: '0.625rem',
  textTransform: 'none',
  fontSize: '14px',
  lineHeight: '17px',
  fontWeight: 500,
  backgroundColor: isActive ? 'primary.200' : 'neutrals.200',
  color: isActive ? 'primary.600' : 'neutrals.700',
  '&:hover': {
    backgroundColor: isActive ? 'primary.300' : 'neutrals.300',
  },
});

const clampCustomDateRange = (
  startDate: string,
  endDate: string
): { startDate: string; endDate: string } => {
  if (startDate <= endDate) {
    return { startDate, endDate };
  }

  return { startDate: endDate, endDate: startDate };
};

export const DashboardPeriodFilter = (): JSX.Element => {
  const { palette } = useTheme();
  const { filters, setFilters } = useDashboardFilterContext();
  const [customMenuAnchor, setCustomMenuAnchor] = useState<HTMLElement | null>(
    null
  );
  const [customStartDate, setCustomStartDate] = useState(
    filters.startDate ?? ''
  );
  const [customEndDate, setCustomEndDate] = useState(filters.endDate ?? '');

  const isCustomSelected = filters.period === 'custom';

  const canApplyCustomRange = useMemo(
    () => customStartDate.trim() !== '' && customEndDate.trim() !== '',
    [customEndDate, customStartDate]
  );

  const handleSelectQuickPeriod = (selectedPeriod: TQuickPeriod): void => {
    setFilters({ period: selectedPeriod });
  };

  const handleOpenCustomMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setCustomStartDate(filters.startDate ?? '');
    setCustomEndDate(filters.endDate ?? '');
    setCustomMenuAnchor(event.currentTarget);
  };

  const handleCloseCustomMenu = (): void => {
    setCustomMenuAnchor(null);
  };

  const handleApplyCustomPeriod = (): void => {
    if (!canApplyCustomRange) {
      return;
    }

    const normalizedRange = clampCustomDateRange(
      customStartDate,
      customEndDate
    );

    setFilters({
      period: 'custom',
      startDate: normalizedRange.startDate,
      endDate: normalizedRange.endDate,
    });

    handleCloseCustomMenu();
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ width: 'fit-content' }}
      >
        {quickPeriodOptions.map((option) => {
          const isActive = filters.period === option.value;

          return (
            <Button
              key={option.value}
              onClick={() => handleSelectQuickPeriod(option.value)}
              variant="text"
              disableElevation
              sx={periodButtonSx(isActive)}
            >
              {option.label}
            </Button>
          );
        })}

        <Button
          onClick={handleOpenCustomMenu}
          variant="text"
          disableElevation
          endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1rem' }} />}
          sx={{
            ...periodButtonSx(isCustomSelected),
            minWidth: '7.75rem',
            justifyContent: 'space-between',
          }}
        >
          Personalizar
        </Button>
      </Stack>

      <Menu
        anchorEl={customMenuAnchor}
        open={Boolean(customMenuAnchor)}
        onClose={handleCloseCustomMenu}
        PaperProps={{
          sx: {
            borderRadius: '0.75rem',
            border: '1px solid',
            borderColor: palette.neutrals[200],
            p: 0,
            width: '18.5rem',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color={palette.neutrals[700]}>
              Periodo personalizado
            </Typography>
            <TextField
              size="small"
              type="date"
              label="Inicio"
              value={customStartDate}
              onChange={(event) => setCustomStartDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              size="small"
              type="date"
              label="Fim"
              value={customEndDate}
              onChange={(event) => setCustomEndDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="text"
              onClick={handleCloseCustomMenu}
              sx={{ textTransform: 'none', height: '2.25rem' }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={handleApplyCustomPeriod}
              disabled={!canApplyCustomRange}
              sx={{ textTransform: 'none', height: '2.25rem' }}
            >
              Aplicar
            </Button>
          </Stack>
        </Box>
      </Menu>
    </>
  );
};
