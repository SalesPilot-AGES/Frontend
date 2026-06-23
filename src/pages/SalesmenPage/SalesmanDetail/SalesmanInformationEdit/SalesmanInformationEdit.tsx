import {
  Box,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import type {
  TSalesmanCompanyOption,
  TSalesmanEditForm,
} from '@store/hooks/useAdminSalesmenDetailsEdit';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { type JSX } from 'react';

type ISalesmanInformationEditProps = {
  salesmanId: string;
  editForm: TSalesmanEditForm;
  companyOptions: TSalesmanCompanyOption[];
  isCompanyEditable?: boolean;
  onFieldChange: (
    field: keyof Omit<TSalesmanEditForm, 'active'>,
    value: string
  ) => void;
  onStatusChange: (checked: boolean) => void;
};

export const SalesmanInformationEdit = ({
  salesmanId,
  editForm,
  companyOptions,
  isCompanyEditable = true,
  onFieldChange,
  onStatusChange,
}: ISalesmanInformationEditProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ItemDetail label="ID do usuário" value={salesmanId} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '1.5rem 2rem',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Nome do usuario
          </Typography>
          <TextField
            value={editForm.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            fullWidth
          />
        </Box>

        {isCompanyEditable && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Empresa
            </Typography>
            <TextField
              select
              value={editForm.companyId}
              onChange={(e) => onFieldChange('companyId', e.target.value)}
              fullWidth
            >
              {companyOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Email de acesso
          </Typography>
          <TextField
            value={editForm.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
              onChange={(e) => onStatusChange(e.target.checked)}
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
