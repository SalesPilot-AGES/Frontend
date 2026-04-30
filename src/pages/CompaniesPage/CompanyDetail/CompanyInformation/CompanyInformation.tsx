import type { TPlan } from '@declarations/ui';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';

export interface ICompanyInformationProps {
  id: string;
  name: string;
  cnpj: string;
  plan: TPlan;
  active: boolean;
  onEdit?: () => void;
}

export const CompanyInformation = ({
  id,
  name,
  cnpj,
  plan,
  active,
  onEdit,
}: ICompanyInformationProps): JSX.Element => {
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
          {row('ID da empresa', <Typography fontWeight={600}>{id}</Typography>)}
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
              <Typography fontWeight={600}>{'(11) 99999-9999'}</Typography>
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
              <Typography fontWeight={600}>{'Rua Exemplo, 123'}</Typography>
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
            <PlanBadge plan={plan} sx={{ fontSize: 'small' }} />
          </Stack>
          <Stack spacing={0.75}>
            <Typography variant="body2" color={labelColor} fontWeight={500}>
              Status
            </Typography>
            <StatusBadge active={active} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
