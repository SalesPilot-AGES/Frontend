import { EPlan } from '@data/enums/EPlan';
import type { TPlan } from '@declarations/ui';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type {
  CompanyInformationProps,
  CompanyInformationValues,
} from './types';

export const PLAN_EDIT_OPTIONS: readonly TPlan[] = [
  EPlan.BASIC,
  EPlan.PRO,
  EPlan.ENTERPRISE,
] as const;

export const pickCompanyValues = (
  props: CompanyInformationProps
): CompanyInformationValues => ({
  displayId: props.displayId,
  name: props.name,
  cnpj: props.cnpj,
  phone: props.phone,
  address: props.address,
  plan: props.plan,
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
  const { displayId, name, cnpj, phone, address, plan, active, onSave } = props;

  const propValues = useMemo(
    (): CompanyInformationValues => ({
      displayId,
      name,
      cnpj,
      phone,
      address,
      plan,
      active,
    }),
    [displayId, name, cnpj, phone, address, plan, active]
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
