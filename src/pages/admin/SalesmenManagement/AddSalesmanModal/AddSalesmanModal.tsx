import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { Company } from '@services/models/CompanySchema';
import {
  CreateSalesmanSchema,
  type TCreateSalesman,
} from '@services/models/SalesmanSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useCreateSalesman } from '@services/queries/useSalesman';
import AppModal from '@UI/AppModal/AppModal';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface IAddSalesmanModalProps {
  open: boolean;
  handleClose: () => void;
}

export const AddSalesmanModal = ({
  open,
  handleClose,
}: IAddSalesmanModalProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCreateSalesman>({
    resolver: zodResolver(CreateSalesmanSchema),
    defaultValues: {
      name: '',
      companyId: '',
      email: '',
      active: true,
    },
  });

  const { data: companiesPage } = useGetCompanies();
  const companyOptions: Company[] = companiesPage?.content ?? [];

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const { mutate: createSalesman } = useCreateSalesman();

  const onSubmit = (data: TCreateSalesman): void => {
    createSalesman(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <AppModal
      modalName="Adicionar vendedor"
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      isSaveButtonDisabled={false}
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
            Nome do vendedor
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
            name="companyId"
            control={control}
            render={({ field }) => (
              <Autocomplete<Company, false, false, false>
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
                    error={!!errors.companyId}
                    helperText={
                      errors.companyId?.message ??
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
                      'aria-label': 'status do vendedor',
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
