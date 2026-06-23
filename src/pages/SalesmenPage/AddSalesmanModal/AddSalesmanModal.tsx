import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Autocomplete,
  Box,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  CreateSalesmanSchema,
  type TCreateSalesman,
  type TSalesmanCompany,
} from '@services/models/SalesmanSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useGetManagerById } from '@services/queries/useManagers';
import { useCreateSalesman } from '@services/queries/useSalesman';
import { selectUser, useAuthStore } from '@store/authStore';
import { AppModal } from '@UI/AppModal/AppModal';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface IAddSalesmanModalProps {
  open: boolean;
  handleClose: () => void;
  variant?: 'admin' | 'manager';
}

export const AddSalesmanModal = ({
  open,
  handleClose,
  variant = 'admin',
}: IAddSalesmanModalProps): JSX.Element => {
  const isManagerVariant = variant === 'manager';

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TCreateSalesman>({
    resolver: zodResolver(CreateSalesmanSchema),
    defaultValues: {
      name: '',
      company: { id: '', name: '' },
      email: '',
      active: true,
    },
  });

  // ADMIN: fetch all companies via the admin-scoped endpoint.
  const { data: companiesPage } = useGetCompanies();

  // MANAGER: fetch the authenticated manager's own record to get the official company.
  // useGetManagerById is a no-op when uuid is null (enabled: !!uuid).
  const user = useAuthStore(selectUser);
  const {
    data: managerData,
    isLoading: isManagerLoading,
    isError: isManagerError,
  } = useGetManagerById(isManagerVariant ? (user?.id ?? null) : null);

  const companyOptions: TSalesmanCompany[] = isManagerVariant
    ? managerData?.company
      ? [managerData.company]
      : []
    : (companiesPage?.content ?? []).filter((c) => c.active);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  // Manager: pre-fill the company field once the manager record loads.
  useEffect(() => {
    if (isManagerVariant && managerData?.company) {
      setValue('company', managerData.company);
    }
  }, [isManagerVariant, managerData?.company, setValue]);

  const { mutate: createSalesman, isPending } = useCreateSalesman();

  const onSubmit = (data: TCreateSalesman): void => {
    if (isPending) return;

    createSalesman(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const getCompanyHelperText = (): string | undefined => {
    if (errors.company?.message) return errors.company.message;
    if (!isManagerVariant && companyOptions.length === 0)
      return 'Nenhuma empresa disponível para vincular.';
    return undefined;
  };

  // Manager blocking states: failed query or successful load with no company.
  // In either case the form must not be rendered as usable.
  const showManagerBlockingError =
    isManagerVariant &&
    !isManagerLoading &&
    (isManagerError || !managerData?.company);

  const managerErrorMessage = isManagerError
    ? 'Não foi possível carregar a empresa do gestor.'
    : 'O gestor não possui empresa vinculada.';

  return (
    <AppModal
      modalName="Adicionar vendedor"
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      isSubmitting={isPending}
      isSaveButtonDisabled={
        isManagerVariant &&
        (isManagerLoading || isManagerError || !managerData?.company)
      }
    >
      {showManagerBlockingError ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px',
            minHeight: 200,
          }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {managerErrorMessage}
          </Alert>
        </Box>
      ) : (
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
              name="company"
              control={control}
              render={({ field }) => (
                <Autocomplete<TSalesmanCompany, false, false, false>
                  disablePortal
                  disabled={isManagerVariant}
                  options={companyOptions}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                  value={
                    companyOptions.find((c) => c.id === field.value?.id) ?? null
                  }
                  onChange={(_, company) => {
                    field.onChange(company ?? null);
                  }}
                  onBlur={field.onBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={field.name}
                      inputRef={field.ref}
                      error={!!errors.company}
                      helperText={getCompanyHelperText()}
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
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                        {
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
      )}
    </AppModal>
  );
};
