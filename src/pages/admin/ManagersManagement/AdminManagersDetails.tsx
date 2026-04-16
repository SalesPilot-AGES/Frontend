import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { ArrowBack, Business, Close, Email, Save } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import type { TManagerWithCompany } from '@services/models/ManagerSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import {
  useGetManagerById,
  useUpdateManager,
} from '@services/queries/useManagers';
import { useNavigate, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { type JSX, useMemo, useState } from 'react';

import { ManagerEditFormComponent } from './ManagerEditForm';

type TManagerEditForm = {
  name: string;
  companyName: string;
  email: string;
  active: boolean;
};

const createEditForm = (manager: TManagerWithCompany): TManagerEditForm => ({
  name: manager.name,
  companyName: manager.company.name,
  email: manager.email,
  active: manager.active,
});

export const AdminManagersDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { id } = useParams({ from: EPageRoutes.ADMIN_MANAGERS_DETAILS });

  const { data: manager, isLoading, isError } = useGetManagerById(id ?? null);
  const { data: companiesResponse } = useGetCompanies(0, 200);
  const updateManagerMutation = useUpdateManager();

  const companyOptions = useMemo(
    () =>
      companiesResponse?.content.map((companyItem) => companyItem.name) ?? [],
    [companiesResponse]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TManagerEditForm | null>(null);

  const isCompanyValid = editForm
    ? companyOptions.includes(editForm.companyName)
    : false;
  const isEditFormValid = isCompanyValid;

  const handleGoBack = (): void => {
    navigate({ to: EPageRoutes.ADMIN_MANAGERS });
  };

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

    const company = companiesResponse?.content.find(
      (companyItem) => companyItem.name === editForm.companyName
    );
    if (!company) {
      return;
    }

    updateManagerMutation.mutate(
      {
        id: manager.id,
        data: {
          name: editForm.name,
          email: editForm.email,
          active: editForm.active,
          companyId: company.id,
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

      return {
        ...previous,
        [field]: value,
      };
    });
  };

  const handleStatusChange = (checked: boolean): void => {
    setEditForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        active: checked,
      };
    });
  };

  if (isLoading) {
    return (
      <PageContainter>
        <Typography>Carregando informações do gestor...</Typography>
      </PageContainter>
    );
  }

  if (isError || !manager) {
    return <PageNotFound />;
  }

  return (
    <PageContainter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '100%',
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{
            textTransform: 'none',
            color: palette.neutrals[600],
          }}
        >
          Voltar para gestores
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <IconBox iconName="manager" theme="managers" />
          <PageHeader title={manager.name} subtitle="" />
        </Box>

        <EntityDetailsCard
          title={EPageTitles.MANAGER_INFORMATION}
          onEdit={isEditing ? undefined : handleEdit}
          headerRight={
            isEditing ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Close />}
                  onClick={handleCancelEdit}
                  disabled={updateManagerMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveEdit}
                  disabled={!isEditFormValid || updateManagerMutation.isPending}
                >
                  Salvar
                </Button>
              </Box>
            ) : undefined
          }
        >
          {isEditing && editForm ? (
            <ManagerEditFormComponent
              editForm={editForm}
              isCompanyValid={isCompanyValid}
              companyOptions={companyOptions}
              onFieldChange={handleFieldChange}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: '2rem 4rem',
              }}
            >
              <ItemDetail label="ID do usuário" value={manager.id} />

              <ItemDetail
                label="Empresa"
                value={manager.company.name}
                icon={<Business fontSize="small" />}
              />

              <ItemDetail label="Nome do usuário" value={manager.name} />

              <ItemDetail label="Status">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                  }}
                >
                  <StatusBadge active={manager.active} />
                </Box>
              </ItemDetail>

              <ItemDetail
                label="Email de acesso"
                value={manager.email}
                icon={<Email fontSize="small" />}
              />
            </Box>
          )}
        </EntityDetailsCard>
      </Box>
    </PageContainter>
  );
};
