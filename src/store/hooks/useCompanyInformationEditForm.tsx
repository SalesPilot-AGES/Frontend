import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CompanyInformationValues } from '@pages/admin/CompaniesManagement/CompanyDetail/CompanyInformation/CompanyInformationView/types';
import {
  planApiToUiLabel,
  planUiLabelToApi,
} from '@pages/admin/CompaniesManagement/planMapping';
import {
  type CompanyUpdateInput,
  CompanyUpdateInputSchema,
} from '@services/models/CompanySchema';
import { useUpdateCompany } from '@services/queries/useCompanies';
import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react';
import {
  type Control,
  useForm,
  type UseFormHandleSubmit,
} from 'react-hook-form';

export interface UseCompanyInformationEditFormParams {
  draft: CompanyInformationValues;
  setDraft: Dispatch<SetStateAction<CompanyInformationValues>>;
  onSaveSuccess?: () => void;
}

export interface UseCompanyInformationEditFormResult {
  palette: Theme['palette'];
  control: Control<CompanyUpdateInput>;
  handleSubmit: UseFormHandleSubmit<CompanyUpdateInput, CompanyUpdateInput>;
  onSubmit: (values: CompanyUpdateInput) => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
  labelColor: string;
  valueColor: string;
  row: (fieldLabel: string, value: ReactNode) => JSX.Element;
}

export const useCompanyInformationEditForm = ({
  draft,
  setDraft,
  onSaveSuccess,
}: UseCompanyInformationEditFormParams): UseCompanyInformationEditFormResult => {
  const { palette } = useTheme();
  const labelColor = palette.neutrals[600];
  const valueColor = palette.neutrals[800];

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<CompanyUpdateInput>({
    resolver: zodResolver(CompanyUpdateInputSchema),
    defaultValues: {
      name: draft.name,
      tax_id: draft.tax_id,
      plan: planUiLabelToApi[draft.plan],
      active: draft.active,
    },
  });

  const { mutateAsync: updateCompany } = useUpdateCompany();

  const onSubmit = async (values: CompanyUpdateInput): Promise<void> => {
    await updateCompany({
      uuid: draft.id,
      data: {
        name: values.name,
        plan: values.plan,
        active: values.active,
      },
    });

    setDraft((current) => ({
      ...current,
      name: values.name ?? current.name,
      plan:
        values.plan !== undefined
          ? planApiToUiLabel[values.plan]
          : current.plan,
      active: values.active ?? current.active,
    }));

    onSaveSuccess?.();
  };

  const row = (fieldLabel: string, value: ReactNode): JSX.Element => (
    <Stack spacing={0.75}>
      <Typography variant="body2" color={labelColor} fontWeight={500}>
        {fieldLabel}
      </Typography>
      <Box sx={{ color: valueColor }}>{value}</Box>
    </Stack>
  );

  return {
    palette,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitting,
    labelColor,
    valueColor,
    row,
  };
};
