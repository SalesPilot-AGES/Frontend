import { zodResolver } from '@hookform/resolvers/zod';
import { formatCnpjInput } from '@hooks/formatCnpjInput';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  PLAN_API_CODES,
  planApiToUiLabel,
} from '@pages/admin/CompaniesManagement/planMapping';
import { getApiError } from '@services/api/errorHandler';
import {
  CompanyCreatePayloadSchema,
  type TCompanyCreatePayload,
} from '@services/models/CompanySchema';
import { useCreateCompany } from '@services/queries/useCompanies';
import AppModal from '@UI/AppModal/AppModal';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import type { JSX } from 'react';
import { useEffect } from 'react';
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
    clearErrors,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<TCompanyCreatePayload>({
    resolver: zodResolver(CompanyCreatePayloadSchema),
    defaultValues: {
      name: '',
      tax_id: '',
      plan: 'BASIC',
      active: true,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const { mutate: createCompany, isPending } = useCreateCompany({
    onSuccess: () => {
      handleClose();
    },
    onError: (error) => {
      const apiError = getApiError(error);
      const fallbackMessage =
        apiError.status === 500
          ? 'Erro interno no servidor ao criar a empresa. Tente novamente e verifique os logs da API.'
          : 'Nao foi possivel criar a empresa. Tente novamente.';

      setError('root', {
        type: 'server',
        message: apiError.message || fallbackMessage,
      });
    },
  });

  const onSubmit = (data: TCompanyCreatePayload): void => {
    clearErrors('root');
    createCompany(data);
  };

  return (
    <AppModal
      modalName="Adicionar empresa"
      open={open}
      handleClose={handleClose}
      isSaveButtonDisabled={!isValid || isPending}
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
            render={({ field }) => {
              const taxIdDigitsCount = field.value.replace(/\D/g, '').length;
              const isTaxIdIncomplete = taxIdDigitsCount < 14;
              const isManualTaxIdError = errors.tax_id?.type === 'manual';
              const showSchemaTaxIdError =
                !!errors.tax_id && !isManualTaxIdError && !isTaxIdIncomplete;

              return (
                <TextField
                  {...field}
                  fullWidth
                  type="text"
                  error={isManualTaxIdError || showSchemaTaxIdError}
                  helperText={
                    isManualTaxIdError || showSchemaTaxIdError
                      ? errors.tax_id?.message
                      : undefined
                  }
                  onChange={(e) => {
                    const nextValue = e.target.value;

                    if (/[A-Za-z]/.test(nextValue)) {
                      setError('tax_id', {
                        type: 'manual',
                        message: 'Apenas numeros aceitos.',
                      });
                      return;
                    }

                    clearErrors('tax_id');
                    field.onChange(formatCnpjInput(nextValue));
                  }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 18,
                    },
                  }}
                />
              );
            }}
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
                  inputProps={{
                    'aria-label': 'status da empresa',
                  }}
                />
              </Box>
            )}
          />
        </Box>
        <Stack spacing={0.75}>
          <Typography variant="body2" fontWeight={500}>
            Plano
          </Typography>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <RadioGroup
                aria-label="Plano da empresa"
                name="company-plan"
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
              >
                <Stack spacing={1} flexDirection={{ xs: 'column', md: 'row' }}>
                  {PLAN_API_CODES.map((planOption) => (
                    <FormControlLabel
                      key={planOption}
                      value={planOption}
                      control={<Radio size="small" disableRipple />}
                      label={
                        <PlanBadge
                          plan={planApiToUiLabel[planOption]}
                          sx={{ fontSize: 'small' }}
                        />
                      }
                      sx={{ mr: 0, ml: 0 }}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
        </Stack>
        {errors.root?.message ? (
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
            <Typography variant="body2" color="error.main">
              {errors.root.message}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </AppModal>
  );
};
