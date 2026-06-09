import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box } from '@mui/material';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX } from 'react';

import type { CompanyInformationValues } from './types';

export const CompanyInformationView = ({
  id,
  name,
  tax_id,
  plan,
  active,
}: CompanyInformationValues): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: '2rem 4rem',
    }}
  >
    <ItemDetail label="ID da empresa" value={id} />
    <ItemDetail label="Nome da empresa" value={name} />
    <ItemDetail label="CNPJ" value={tax_id} />
    <ItemDetail
      label="Telefone"
      value="99999-9999"
      icon={<PhoneOutlinedIcon fontSize="small" />}
    />
    <ItemDetail
      label="Endereço"
      value="Rua Exemplo, 123"
      icon={<LocationOnOutlinedIcon fontSize="small" />}
    />
    <ItemDetail label="Plano">
      <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
        <PlanBadge plan={plan} />
      </Box>
    </ItemDetail>
    <ItemDetail label="Status">
      <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
        <StatusBadge active={active} />
      </Box>
    </ItemDetail>
  </Box>
);
