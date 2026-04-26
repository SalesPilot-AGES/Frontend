import type {
  TManagerCompanyOption,
  TManagerEditForm,
} from '@pages/admin/ManagersManagement/ManagerEditForm';
import type { TManager } from '@services/models/ManagerSchema';
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

const createEditForm = (manager: TManager): TManagerEditForm => ({
  name: manager.name,
  companyId: manager.company_id,
  email: manager.email,
  active: manager.active,
});

export const useAdminManagersDetailsEdit = (
  manager: TManager | null
): UseAdminManagersDetailsEditResult => {
  const { data: companiesResponse } = useGetCompanies(0, 200);
  const updateManagerMutation = useUpdateManager();

  const companyOptions = useMemo(() => {
    const fromApi =
      companiesResponse?.content.map((companyItem) => ({
        id: companyItem.id,
        name: companyItem.name,
      })) ?? [];
    if (manager && !fromApi.some((row) => row.id === manager.company_id)) {
      const companyName =
        fromApi.find((row) => row.id === manager.company_id)?.name ??
        'Unknown Company';
      return [{ id: manager.company_id, name: companyName }, ...fromApi];
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

    updateManagerMutation.mutate(
      {
        uuid: manager.id,
        data: {
          name: editForm.name,
          email: editForm.email,
          active: editForm.active,
        },
      },
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
