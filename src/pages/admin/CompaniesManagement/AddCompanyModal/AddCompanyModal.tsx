import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Switch, TextField, Typography } from '@mui/material';
import {
  type CompanyCreateInput,
  CompanyCreateInputSchema,
} from '@services/models/CompanySchema';
import { useCreateCompany } from '@services/queries/useCompanies';
import AppModal from '@UI/AppModal/AppModal';
import type { JSX } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface IAddCompanyModalProps {
  open: boolean;
  handleClose: () => void;
}

export const AddCompanyModal = ({
  open,
  handleClose,
}: IAddCompanyModalProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyCreateInput>({
    resolver: zodResolver(CompanyCreateInputSchema),
    defaultValues: {
      name: '',
      tax_id: '',
      plan: 'STARTER',
      active: true,
    },
  });

  const { mutate: createCompany } = useCreateCompany();

  const onSubmit = (data: CompanyCreateInput): void => {
    createCompany(data);
    handleClose();
  };

  return (
    <AppModal
      modalName="Adicionar empresa"
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
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
            Nome da empresa
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            CNPJ
          </Typography>
          <Controller
            name="tax_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="text"
                error={!!errors.tax_id}
                helperText={errors.tax_id?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Status
          </Typography>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Typography variant="body2">
                  {field.value ? 'Ativo' : 'Inativo'}
                </Typography>
                <Switch
                  {...field}
                  checked={field.value}
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
                      'aria-label': 'status da empresa',
                    },
                  }}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
    </AppModal>
  );
};
