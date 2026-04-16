import {
  Box,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { type JSX } from 'react';

type TManagerEditForm = {
  name: string;
  companyName: string;
  email: string;
  active: boolean;
};

type ManagerEditFormProps = {
  editForm: TManagerEditForm;
  isCompanyValid: boolean;
  companyOptions: string[];
  onFieldChange: (
    field: keyof Omit<TManagerEditForm, 'active'>,
    value: string
  ) => void;
  onStatusChange: (checked: boolean) => void;
};

export const ManagerEditFormComponent = ({
  editForm,
  isCompanyValid,
  companyOptions,
  onFieldChange,
  onStatusChange,
}: ManagerEditFormProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <ItemDetail label="ID do usuário" value={editForm.name} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '1.5rem 2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Nome do usuario
          </Typography>
          <TextField
            value={editForm.name}
            onChange={(event) => {
              onFieldChange('name', event.target.value);
            }}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Empresa
          </Typography>
          <TextField
            select
            value={editForm.companyName}
            onChange={(event) => {
              onFieldChange('companyName', event.target.value);
            }}
            fullWidth
            error={!isCompanyValid && editForm.companyName === ''}
            helperText={
              !isCompanyValid && editForm.companyName === ''
                ? 'Selecione uma empresa da lista.'
                : ''
            }
          >
            <MenuItem value="">Selecione uma empresa</MenuItem>
            {companyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Email de acesso
          </Typography>
          <TextField
            value={editForm.email}
            onChange={(event) => {
              onFieldChange('email', event.target.value);
            }}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Status
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              minHeight: '3rem',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {editForm.active ? 'Ativo' : 'Inativo'}
            </Typography>
            <Switch
              checked={editForm.active}
              onChange={(event) => {
                onStatusChange(event.target.checked);
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: palette.success[400],
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: palette.success[200],
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
