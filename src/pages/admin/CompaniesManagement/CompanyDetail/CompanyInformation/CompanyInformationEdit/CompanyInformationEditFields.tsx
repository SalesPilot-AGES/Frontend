import { EStatus } from '@data/enums/EStatus';
import type { TPlan } from '@declarations/ui';
import { formatCnpjInput } from '@hooks/formatCnpjInput';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { Palette } from '@mui/material/styles';
import type { CompanyUpdateInput } from '@services/models/CompanySchema';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react';
import { type Control, Controller } from 'react-hook-form';

import type { CompanyInformationValues } from '../CompanyInformationView/types';
import { PLAN_EDIT_OPTIONS } from './useCompanyInformationEdit';

export interface CompanyInformationEditFieldsProps {
  draft: CompanyInformationValues;
  setDraft: Dispatch<SetStateAction<CompanyInformationValues>>;
  control: Control<CompanyUpdateInput>;
  labelColor: string;
  valueColor: string;
  palette: Palette;
  row: (fieldLabel: string, value: ReactNode) => JSX.Element;
}

export const CompanyInformationEditFields = ({
  draft,
  setDraft,
  control,
  labelColor,
  valueColor,
  palette,
  row,
}: CompanyInformationEditFieldsProps): JSX.Element => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={4}
    alignItems={{ xs: 'stretch', md: 'flex-start' }}
  >
    <Stack spacing={2.5} sx={{ flex: { md: '1 1 58%' } }}>
      {row(
        'ID da empresa',
        <Typography fontWeight={600}>{draft.id}</Typography>
      )}
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
          Nome da empresa
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                field.onChange(e);
                setDraft((d) => ({ ...d, name: e.target.value }));
              }}
            />
          )}
        />
      </Stack>
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
          CNPJ
        </Typography>
        <Controller
          name="tax_id"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                const maskedTaxId = formatCnpjInput(e.target.value);
                field.onChange(maskedTaxId);
                setDraft((d) => ({ ...d, tax_id: maskedTaxId }));
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 18,
                },
              }}
            />
          )}
        />
      </Stack>
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
          Telefone
        </Typography>
        <TextField
          fullWidth
          value={'99999-9999'}
          onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlinedIcon
                    sx={{
                      fontSize: '1.125rem',
                      color: palette.neutrals[500],
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
          Endereço
        </Typography>
        <TextField
          fullWidth
          value={'Rua Exemplo, 123'}
          onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignItems: 'flex-start', mt: 0.75 }}
                >
                  <LocationOnOutlinedIcon
                    sx={{
                      fontSize: '1.125rem',
                      color: palette.neutrals[500],
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </Stack>
    <Stack
      spacing={2.5}
      sx={{ flex: { md: '1 1 42%' }, minWidth: { md: 200 } }}
    >
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
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
              onChange={(_, value) => {
                field.onChange(value);
                const nextPlan = value as TPlan;
                setDraft((d) => ({ ...d, plan: nextPlan }));
              }}
            >
              <Stack spacing={1} flexDirection={{ xs: 'column', md: 'row' }}>
                {PLAN_EDIT_OPTIONS.map((planOption) => (
                  <FormControlLabel
                    key={planOption}
                    value={planOption}
                    control={<Radio size="small" disableRipple />}
                    label={
                      <PlanBadge plan={planOption} sx={{ fontSize: 'small' }} />
                    }
                    sx={{ mr: 0, ml: 0 }}
                  />
                ))}
              </Stack>
            </RadioGroup>
          )}
        />
      </Stack>
      <Stack spacing={0.75}>
        <Typography variant="body2" color={labelColor} fontWeight={500}>
          Status
        </Typography>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Typography variant="body2" color={valueColor} fontWeight={500}>
                {field.value ? EStatus.ACTIVE : EStatus.INACTIVE}
              </Typography>
              <Switch
                {...field}
                checked={field.value ?? false}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setDraft((d) => ({ ...d, active: e.target.checked }));
                }}
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
                    'aria-label': 'Status ativo da empresa',
                  },
                }}
              />
            </Stack>
          )}
        />
      </Stack>
    </Stack>
  </Stack>
);
