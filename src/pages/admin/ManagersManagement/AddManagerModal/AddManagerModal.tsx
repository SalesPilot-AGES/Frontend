import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { TCompany } from '@services/models/CompanySchema';
import {
  ManagerCreatePayloadSchema,
  type TManagerCreatePayload,
} from '@services/models/ManagerSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useCreateManager } from '@services/queries/useManagers';
import AppModal from '@UI/AppModal/AppModal';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface IAddManagerModalProps {
  open: boolean;
  handleClose: () => void;
}

export const AddManagerModal = ({
  open,
  handleClose,
}: IAddManagerModalProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TManagerCreatePayload>({
    resolver: zodResolver(ManagerCreatePayloadSchema),
    defaultValues: {
      name: '',
      company_id: '',
      email: '',
      active: true,
      preferences: {},
    },
  });

  const { data: companiesPage } = useGetCompanies();
  const companyOptions: TCompany[] = companiesPage?.content ?? [];

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const { mutate: createManager } = useCreateManager();

  const onSubmit = (data: TManagerCreatePayload): void => {
    createManager(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <AppModal
      modalName="Adicionar gerente"
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
            Nome do gerente
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
            Empresa
          </Typography>
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Autocomplete<TCompany, false, false, false>
                disablePortal
                options={companyOptions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(a, b) => a.id === b.id}
                value={companyOptions.find((c) => c.id === field.value) ?? null}
                onChange={(_, company) => {
                  field.onChange(company?.id ?? '');
                }}
                onBlur={field.onBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.company_id}
                    helperText={
                      errors.company_id?.message ??
                      (companyOptions.length === 0
                        ? 'Nenhuma empresa disponível para vincular.'
                        : undefined)
                    }
                  />
                )}
              />
            )}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 1 }} variant="body2">
            Email de acesso
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
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
                      'aria-label': 'status do gestor',
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
