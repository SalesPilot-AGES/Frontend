import type { TManager } from '@services/models/ManagerSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useUpdateManager } from '@services/queries/useManagers';
import { useMemo, useState } from 'react';

import type {
  TManagerCompanyOption,
  TManagerEditForm,
} from './ManagerInformationEdit/types';

export type UseManagerInformationResult = {
  companyOptions: TManagerCompanyOption[];
  isCompanyValid: boolean;
  isEditFormValid: boolean;
  isEditing: boolean;
  editForm: TManagerEditForm | null;
  updateManagerMutation: ReturnType<typeof useUpdateManager>;
  handleEdit: () => void;
  handleCancelEdit: () => void;
  handleSaveEdit: () => void;
  handleFieldChange: (
    field: keyof Omit<TManagerEditForm, 'active'>,
    value: string
  ) => void;
  handleStatusChange: (checked: boolean) => void;
};

const createEditForm = (manager: TManager): TManagerEditForm => ({
  name: manager.name,
  companyId: manager.company.id,
  email: manager.email,
  active: manager.active,
});

export const useManagerInformation = (
  manager: TManager | null
): UseManagerInformationResult => {
  const { data: companiesResponse } = useGetCompanies(0, 200);
  const updateManagerMutation = useUpdateManager();

  const companyOptions = useMemo(() => {
    const fromApi =
      companiesResponse?.content.map((company) => ({
        id: company.id,
        name: company.name,
      })) ?? [];
    if (manager && !fromApi.some((row) => row.id === manager.company.id)) {
      return [
        { id: manager.company.id, name: manager.company.name },
        ...fromApi,
      ];
    }
    return fromApi;
  }, [companiesResponse, manager]);

  const validCompanyIds = useMemo(
    () => new Set(companyOptions.map((row) => row.id)),
    [companyOptions]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TManagerEditForm | null>(null);

  const isCompanyValid = editForm
    ? validCompanyIds.has(editForm.companyId)
    : false;
  const isEditFormValid = !!editForm && !!manager && isCompanyValid;

  const handleEdit = (): void => {
    if (!manager) return;
    setEditForm(createEditForm(manager));
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    if (!manager) return;
    setEditForm(createEditForm(manager));
    setIsEditing(false);
  };

  const handleSaveEdit = (): void => {
    if (!manager || !editForm || !isEditFormValid) return;
    updateManagerMutation.mutate(
      {
        uuid: manager.id,
        data: {
          name: editForm.name,
          email: editForm.email,
          active: editForm.active,
          company_id: editForm.companyId,
        },
      },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleFieldChange = (
    field: keyof Omit<TManagerEditForm, 'active'>,
    value: string
  ): void => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleStatusChange = (checked: boolean): void => {
    setEditForm((prev) => (prev ? { ...prev, active: checked } : prev));
  };

  return {
    companyOptions,
    isCompanyValid,
    isEditFormValid,
    isEditing,
    editForm,
    updateManagerMutation,
    handleEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleFieldChange,
    handleStatusChange,
  };
};
