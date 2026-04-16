import { zodResolver } from '@hookform/resolvers/zod';
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
  type CompanyCreateInput,
  CompanyCreateInputSchema,
} from '@services/models/CompanySchema';
import { useCreateCompany } from '@services/queries/useCompanies';
import AppModal from '@UI/AppModal/AppModal';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import type { JSX } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { PLAN_EDIT_OPTIONS } from '../CompanyDetail/CompanyInformation/CompanyInformationEdit/useCompanyInformationEdit';

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
    formState: { errors, isValid },
    reset,
  } = useForm<CompanyCreateInput>({
    resolver: zodResolver(CompanyCreateInputSchema),
    defaultValues: {
      name: '',
      tax_id: '',
      plan: 'BASIC',
      active: true,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

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
      isSaveButtonDisabled={!isValid}
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
                  {PLAN_EDIT_OPTIONS.map((planOption) => (
                    <FormControlLabel
                      key={planOption}
                      value={planOption}
                      control={<Radio size="small" disableRipple />}
                      label={
                        <PlanBadge
                          plan={planOption}
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
      </Box>
    </AppModal>
  );
};
