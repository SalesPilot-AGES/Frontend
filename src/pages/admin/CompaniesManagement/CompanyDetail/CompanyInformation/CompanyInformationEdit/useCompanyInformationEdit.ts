import {
  type CompanyPlanCode,
  planApiToUiLabel,
} from '@pages/admin/CompaniesManagement/planMapping';
import type { CompanyDetail } from '@services/models/CompanySchema';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type {
  CompanyInformationProps,
  CompanyInformationValues,
} from '../CompanyInformationView/types';

const isApiPlanCode = (plan: string): plan is CompanyPlanCode =>
  plan === 'BASIC' || plan === 'PRO' || plan === 'ENTERPRISE';

/** Aceita valores de tela (`TPlan`) ou resposta da API (`BASIC` / `PRO` / `ENTERPRISE`). */
export const pickCompanyValues = (
  props:
    | CompanyInformationProps
    | Pick<CompanyDetail, 'id' | 'name' | 'tax_id' | 'plan' | 'active'>
): CompanyInformationValues => ({
  id: props.id,
  name: props.name,
  tax_id: props.tax_id,
  plan: isApiPlanCode(props.plan) ? planApiToUiLabel[props.plan] : props.plan,
  active: props.active,
});

export const cloneCompanyValues = (
  values: CompanyInformationValues
): CompanyInformationValues => ({ ...values });

export const useCompanyInformation = (
  props: CompanyInformationProps
): {
  isEditing: boolean;
  viewValues: CompanyInformationValues;
  draft: CompanyInformationValues;
  setDraft: Dispatch<SetStateAction<CompanyInformationValues>>;
  startEdit: () => void;
  cancelEdit: () => void;
  saveEdit: () => void;
} => {
  const { id, name, tax_id: cnpj, plan, active, onSave } = props;

  const propValues = useMemo(
    (): CompanyInformationValues => ({
      id,
      name,
      tax_id: cnpj,
      plan,
      active,
    }),
    [id, name, cnpj, plan, active]
  );

  const [committed, setCommitted] = useState<CompanyInformationValues | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CompanyInformationValues>(() =>
    cloneCompanyValues(propValues)
  );

  const viewValues = committed ?? propValues;

  const startEdit = useCallback(() => {
    setDraft(cloneCompanyValues(viewValues));
    setIsEditing(true);
  }, [viewValues]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const saveEdit = useCallback(() => {
    onSave?.(draft);
    setCommitted(cloneCompanyValues(draft));
    setIsEditing(false);
  }, [draft, onSave]);

  return {
    isEditing,
    viewValues,
    draft,
    setDraft,
    startEdit,
    cancelEdit,
    saveEdit,
  };
};
