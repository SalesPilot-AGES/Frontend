import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';

import type { CompanyInformationValues } from './types';

export const CompanyInformationView = ({
  id,
  name,
  tax_id,
  plan,
  active,
}: CompanyInformationValues): JSX.Element => {
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
        {row('CNPJ', <Typography fontWeight={600}>{tax_id}</Typography>)}
        {row(
          'Telefone',
          <Stack direction="row" alignItems="center" gap={1}>
            <PhoneOutlinedIcon
              sx={{ fontSize: '1.125rem', color: palette.neutrals[500] }}
            />
            <Typography fontWeight={600}>{'99999-9999'}</Typography>
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
  );
};
