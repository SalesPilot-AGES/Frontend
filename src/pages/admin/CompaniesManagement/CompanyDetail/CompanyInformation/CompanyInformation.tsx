import EditIcon from '@mui/icons-material/Edit';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { JSX, ReactNode } from 'react';

/** Placeholder até o componente de badge de plano estar pronto. */
const MockPlanBadge = ({ label }: { label: string }): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: '0.5rem',
        bgcolor: palette.primary[100],
        color: palette.primary[700],
        fontSize: '0.875rem',
        fontWeight: 600,
        maxWidth: 'fit-content',
      }}
    >
      {label}
    </Box>
  );
};

/** Placeholder até o componente de badge de status estar pronto. */
const MockStatusBadge = ({ label }: { label: string }): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: '0.5rem',
        bgcolor: palette.success[100],
        color: palette.success[400],
        fontSize: '0.875rem',
        fontWeight: 600,
        maxWidth: 'fit-content',
      }}
    >
      {label}
    </Box>
  );
};

export interface CompanyInformationProps {
  displayId: string;
  name: string;
  cnpj: string;
  phone: string;
  address: string;
  planLabel: string;
  statusLabel: string;
  onEdit?: () => void;
}

export const CompanyInformation = ({
  displayId,
  name,
  cnpj,
  phone,
  address,
  planLabel,
  statusLabel,
  onEdit,
}: CompanyInformationProps): JSX.Element => {
  const { palette } = useTheme();
  const labelColor = palette.neutrals[600];
  const valueColor = palette.neutrals[800];

  const row = (fieldLabel: string, value: ReactNode): JSX.Element => (
    <Stack spacing={0.75}>
      <Typography variant="body2" color={labelColor} fontWeight={500}>
        {fieldLabel}
      </Typography>
      <Box sx={{ color: valueColor }}>{value}</Box>
    </Stack>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        width: '100%',
        border: `1px solid ${palette.neutrals[200]}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1.5}
        sx={{ mb: 3 }}
      >
        <Typography variant="h2">Informações da empresa</Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
          aria-label="Editar informações da empresa"
        >
          Editar
        </Button>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems={{ xs: 'stretch', md: 'flex-start' }}
      >
        <Stack spacing={2.5} sx={{ flex: { md: '1 1 58%' } }}>
          {row(
            'ID da empresa',
            <Typography fontWeight={600}>{displayId}</Typography>
          )}
          {row(
            'Nome da empresa',
            <Typography fontWeight={600}>{name}</Typography>
          )}
          {row('CNPJ', <Typography fontWeight={600}>{cnpj}</Typography>)}
          {row(
            'Telefone',
            <Stack direction="row" alignItems="center" gap={1}>
              <PhoneOutlinedIcon
                sx={{ fontSize: '1.125rem', color: palette.neutrals[500] }}
              />
              <Typography fontWeight={600}>{phone}</Typography>
            </Stack>
          )}
          {row(
            'Endereço',
            <Stack direction="row" alignItems="flex-start" gap={1}>
              <LocationOnOutlinedIcon
                sx={{
                  fontSize: '1.125rem',
                  color: palette.neutrals[500],
                  mt: 0.125,
                }}
              />
              <Typography fontWeight={600}>{address}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack
          spacing={2.5}
          sx={{ flex: { md: '1 1 42%' }, minWidth: { md: 200 } }}
        >
          <Stack spacing={0.75}>
            <Typography variant="body2" color={labelColor} fontWeight={500}>
              Plano
            </Typography>
            <MockPlanBadge label={planLabel} />
          </Stack>
          <Stack spacing={0.75}>
            <Typography variant="body2" color={labelColor} fontWeight={500}>
              Status
            </Typography>
            <MockStatusBadge label={statusLabel} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
