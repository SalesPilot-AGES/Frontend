import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material';
import type { TManager } from '@services/models/ManagerSchema';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX } from 'react';

type IManagerInformationViewProps = {
  manager: TManager;
};

export const ManagerInformationView = ({
  manager,
}: IManagerInformationViewProps): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: '2rem 4rem',
    }}
  >
    <ItemDetail label="ID do usuário" value={manager.id} />

    <ItemDetail
      label="Empresa"
      value={manager.company.name}
      icon={<BusinessIcon fontSize="small" />}
    />

    <ItemDetail label="Nome do usuário" value={manager.name} />

    <ItemDetail label="Status">
      <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
        <StatusBadge active={manager.active} />
      </Box>
    </ItemDetail>

    <ItemDetail
      label="Email de acesso"
      value={manager.email}
      icon={<EmailIcon fontSize="small" />}
    />
  </Box>
);
