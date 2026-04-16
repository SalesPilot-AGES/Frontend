import {
  Autocomplete,
  Box,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AppModal from '@UI/AppModal/AppModal';
import type { JSX } from 'react';
import { useState } from 'react';

const companyOptions: string[] = [
  'SalesPilot',
  'Tech Corp',
  'Vision Hub',
  'Prime Solutions',
];

type AddManagerModalProps = {
  open: boolean;
  handleClose: () => void;
};

export const AddManagerModal = ({
  open,
  handleClose,
}: AddManagerModalProps): JSX.Element => {
  const [managerName, setManagerName] = useState<string>('');
  const [accessEmail, setAccessEmail] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <AppModal
      modalName="Adicionar gestor"
      open={open}
      handleClose={handleClose}
    >
      <Box
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '48px',
          marginBottom: '48px',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          columnGap: '32px',
          rowGap: '32px',
        }}
      >
        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Nome do gestor
          </Typography>
          <TextField
            fullWidth
            value={managerName}
            onChange={(event) => setManagerName(event.target.value)}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Empresa
          </Typography>
          <Autocomplete
            disablePortal
            options={companyOptions}
            value={selectedCompany}
            onChange={(_, value) => setSelectedCompany(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Email de acesso
          </Typography>
          <TextField
            fullWidth
            type="email"
            value={accessEmail}
            onChange={(event) => setAccessEmail(event.target.value)}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Status
          </Typography>
          <Box
            sx={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
          >
            <Typography variant="body2">
              {isActive ? 'Ativo' : 'Desativo'}
            </Typography>
            <Switch
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#2E7D32',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#2E7D32',
                },
              }}
              slotProps={{
                input: {
                  'aria-label': 'status do gestor',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </AppModal>
  );
};
