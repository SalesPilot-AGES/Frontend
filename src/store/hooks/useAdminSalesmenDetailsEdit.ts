import type { TSalesman } from '@services/models/SalesmanSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useUpdateSalesman } from '@services/queries/useSalesmen';
import { useMemo, useState } from 'react';

export type TSalesmanEditForm = {
  name: string;
  companyId: string;
  email: string;
  active: boolean;
};

export type TSalesmanCompanyOption = {
  id: string;
  name: string;
};

const createEditForm = (salesman: TSalesman): TSalesmanEditForm => ({
  name: salesman.name,
  companyId: salesman.company.id,
  email: salesman.email,
  active: salesman.active,
});

export const useAdminSalesmenDetailsEdit = (
  salesman: TSalesman | null,
  isEditing: boolean,
  onSaveSuccess?: () => void
): {
  editForm: TSalesmanEditForm | null;
  isEditFormValid: boolean;
  companyOptions: TSalesmanCompanyOption[];
  handleSaveEdit: () => void;
  handleFieldChange: (
    field: keyof Omit<TSalesmanEditForm, 'active'>,
    value: string
  ) => void;
  handleStatusChange: (checked: boolean) => void;
} => {
  const { data: companiesResponse } = useGetCompanies(0, 200);
  const updateSalesmanMutation = useUpdateSalesman();
  const [draftEditForm, setDraftEditForm] = useState<TSalesmanEditForm | null>(
    null
  );

  const editForm = useMemo(() => {
    if (!salesman) return null;
    if (!isEditing) return createEditForm(salesman);
    return draftEditForm ?? createEditForm(salesman);
  }, [draftEditForm, isEditing, salesman]);

  const companyOptions = useMemo(() => {
    const fromApi =
      companiesResponse?.content.map((company) => ({
        id: company.id,
        name: company.name,
      })) ?? [];

    if (!salesman) return fromApi;

    if (!fromApi.some((company) => company.id === salesman.company.id)) {
      return [
        { id: salesman.company.id, name: salesman.company.name },
        ...fromApi,
      ];
    }

    return fromApi;
  }, [companiesResponse, salesman]);

  const validCompanyIds = useMemo(
    () => new Set(companyOptions.map((option) => option.id)),
    [companyOptions]
  );

  const isEditFormValid = !!editForm && validCompanyIds.has(editForm.companyId);

  const handleSaveEdit = (): void => {
    if (!salesman || !editForm || !isEditFormValid) return;

    updateSalesmanMutation.mutate(
      {
        uuid: salesman.id,
        data: {
          name: editForm.name,
          email: editForm.email,
          active: editForm.active,
          company_id: editForm.companyId,
        },
      },
      {
        onSuccess: (updatedSalesman) => {
          setDraftEditForm(createEditForm(updatedSalesman));
          onSaveSuccess?.();
        },
      }
    );
  };

  const handleFieldChange = (
    field: keyof Omit<TSalesmanEditForm, 'active'>,
    value: string
  ): void => {
    setDraftEditForm((prev) => {
      if (prev) return { ...prev, [field]: value };
      if (!salesman) return prev;

      return { ...createEditForm(salesman), [field]: value };
    });
  };

  const handleStatusChange = (checked: boolean): void => {
    setDraftEditForm((prev) => {
      if (prev) return { ...prev, active: checked };
      if (!salesman) return prev;

      return { ...createEditForm(salesman), active: checked };
    });
  };

  return {
    editForm,
    isEditFormValid,
    companyOptions,
    handleSaveEdit,
    handleFieldChange,
    handleStatusChange,
  };
};
