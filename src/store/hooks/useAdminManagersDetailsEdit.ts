import type {
  TManagerCompanyOption,
  TManagerEditForm,
} from '@pages/admin/ManagersManagement/ManagerEditForm';
import { buildAdminManagerDetailsUpdatePayload } from '@services/api/manager';
import type { TManagerWithCompany } from '@services/models/ManagerSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useUpdateManager } from '@services/queries/useManagers';
import { useMemo, useState } from 'react';

export type UseAdminManagersDetailsEditResult = {
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

const createEditForm = (manager: TManagerWithCompany): TManagerEditForm => ({
  name: manager.name,
  companyId: manager.company.id,
  email: manager.email,
  active: manager.active,
});

export const useAdminManagersDetailsEdit = (
  manager: TManagerWithCompany | null
): UseAdminManagersDetailsEditResult => {
  const { data: companiesResponse } = useGetCompanies(0, 200);
  const updateManagerMutation = useUpdateManager();

  const companyOptions = useMemo(() => {
    const fromApi =
      companiesResponse?.content.map((companyItem) => ({
        id: companyItem.id,
        name: companyItem.name,
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
    if (!manager) {
      return;
    }
    setEditForm(createEditForm(manager));
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    if (!manager) {
      return;
    }
    setEditForm(createEditForm(manager));
    setIsEditing(false);
  };

  const handleSaveEdit = (): void => {
    if (!manager || !editForm || !isEditFormValid) {
      return;
    }

    const data = buildAdminManagerDetailsUpdatePayload(manager, {
      name: editForm.name,
      email: editForm.email,
      active: editForm.active,
      companyId: editForm.companyId,
    });

    updateManagerMutation.mutate(
      { id: manager.id, data },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleFieldChange = (
    field: keyof Omit<TManagerEditForm, 'active'>,
    value: string
  ): void => {
    setEditForm((previous) => {
      if (!previous) {
        return previous;
      }
      return { ...previous, [field]: value };
    });
  };

  const handleStatusChange = (checked: boolean): void => {
    setEditForm((previous) => {
      if (!previous) {
        return previous;
      }
      return { ...previous, active: checked };
    });
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
