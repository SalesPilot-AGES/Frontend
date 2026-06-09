import { EStatus } from '@data/enums/EStatus';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  Box,
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
import type { TCompanyUpdatePayload } from '@services/models/CompanySchema';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import {
  type CompanyPlanCode,
  PLAN_API_CODES,
  planApiToUiLabel,
} from '@utils/planMapping';
import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react';
import { type Control, Controller } from 'react-hook-form';

import type { CompanyInformationValues } from '../../CompanyInformationView/types';

export interface CompanyInformationEditFieldsProps {
  draft: CompanyInformationValues;
  setDraft: Dispatch<SetStateAction<CompanyInformationValues>>;
  control: Control<TCompanyUpdatePayload>;
  labelColor: string;
  valueColor: string;
  palette: Palette;
}

export const CompanyInformationEditFields = ({
  draft,
  setDraft,
  control,
  labelColor,
  valueColor,
  palette,
}: CompanyInformationEditFieldsProps): JSX.Element => {
  const row = (fieldLabel: string, value: ReactNode): JSX.Element => (
    <Stack spacing={0.75}>
      <Typography variant="body2" color={labelColor}>
        {fieldLabel}
      </Typography>
      <Box sx={{ color: valueColor }}>{value}</Box>
    </Stack>
  );

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      alignItems={{ xs: 'stretch', md: 'flex-start' }}
    >
      <Stack spacing={2.5} sx={{ flex: { md: '1 1 58%' } }}>
        {row('ID da empresa', <Typography variant="h6">{draft.id}</Typography>)}
        {row('CNPJ', <Typography variant="h6">{draft.tax_id}</Typography>)}
        <Stack spacing={0.75}>
          <Typography variant="body2" color={labelColor}>
            Endereço
          </Typography>
          <TextField
            fullWidth
            value={'Rua Exemplo, 123'}
            onChange={(e) =>
              setDraft((d) => ({ ...d, address: e.target.value }))
            }
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
        <Stack spacing={0.75}>
          <Typography variant="body2" color={labelColor}>
            Telefone
          </Typography>
          <TextField
            fullWidth
            value={'99999-9999'}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
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
      </Stack>
      <Stack
        spacing={2.5}
        sx={{ flex: { md: '1 1 42%' }, minWidth: { md: 200 } }}
      >
        <Stack spacing={0.75}>
          <Typography variant="body2" color={labelColor}>
            Nome da empresa
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
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
          <Typography variant="body2" color={labelColor}>
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
                  const apiPlan = value as CompanyPlanCode;
                  field.onChange(apiPlan);
                  setDraft((d) => ({
                    ...d,
                    plan: planApiToUiLabel[apiPlan],
                  }));
                }}
              >
                <Stack
                  flexDirection={{ xs: 'column', md: 'row' }}
                  alignItems="center"
                  sx={{ gap: 1 }}
                >
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
        <Stack spacing={0.75}>
          <Typography variant="body2" color={labelColor}>
            Status
          </Typography>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Stack
                direction="row"
                alignItems="center"
                gap={1.5}
                sx={{ minHeight: '3rem' }}
              >
                <Typography variant="h6" fontWeight={500}>
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
                      color: palette.success[400],
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: palette.success[200],
                      opacity: 1,
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
};
