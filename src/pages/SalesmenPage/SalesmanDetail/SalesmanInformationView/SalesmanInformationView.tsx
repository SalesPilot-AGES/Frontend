import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box } from '@mui/material';
import type { TSalesman } from '@services/models/SalesmanSchema';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX } from 'react';

type ISalesmanInformationViewProps = {
  salesman: TSalesman;
};

export const SalesmanInformationView = ({
  salesman,
}: ISalesmanInformationViewProps): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: '2rem 4rem',
    }}
  >
    <ItemDetail label="ID do usuário" value={salesman.id} />

    <ItemDetail
      label="Empresa"
      value={salesman.company.name}
      icon={<BusinessIcon fontSize="small" />}
    />

    <ItemDetail label="Nome do usuário" value={salesman.name} />

    <ItemDetail label="Status">
      <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
        <StatusBadge active={salesman.active} />
      </Box>
    </ItemDetail>

    <ItemDetail
      label="Email de acesso"
      value={salesman.email}
      icon={<EmailIcon fontSize="small" />}
    />

    <ItemDetail
      label="Telefone"
      value={salesman.phone || 'Não informado'}
      icon={<PhoneIcon fontSize="small" />}
    />
  </Box>
);
