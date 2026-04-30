import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CompanyInformationValues } from '@pages/CompaniesPage/CompanyDetail/CompanyInformation/CompanyInformationView/types';
import {
  CompanyUpdatePayloadSchema,
  type TCompanyUpdatePayload,
} from '@services/models/CompanySchema';
import { useUpdateCompany } from '@services/queries/useCompanies';
import { planApiToUiLabel, planUiLabelToApi } from '@utils/planMapping';
import type { Dispatch, SetStateAction } from 'react';
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
  control: Control<TCompanyUpdatePayload>;
  handleSubmit: UseFormHandleSubmit<
    TCompanyUpdatePayload,
    TCompanyUpdatePayload
  >;
  onSubmit: (values: TCompanyUpdatePayload) => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
  labelColor: string;
  valueColor: string;
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
  } = useForm<TCompanyUpdatePayload>({
    resolver: zodResolver(CompanyUpdatePayloadSchema),
    defaultValues: {
      name: draft.name,
      plan: planUiLabelToApi[draft.plan],
      active: draft.active,
    },
  });

  const { mutateAsync: updateCompany } = useUpdateCompany();

  const onSubmit = async (values: TCompanyUpdatePayload): Promise<void> => {
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

  return {
    palette,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitting,
    labelColor,
    valueColor,
  };
};
