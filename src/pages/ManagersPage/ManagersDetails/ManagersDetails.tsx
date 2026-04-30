import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { ArrowBack, Business, Close, Email, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import { useManagersDetails } from '@pages/ManagersPage/ManagersDetails/useManagersDetails';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useGetManagerById } from '@services/queries/useManagers';
import { Link, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { type JSX } from 'react';

import { ManagerEditForm } from './ManagerEditForm/ManagerEditForm';

export const ManagersDetails = (): JSX.Element => {
  const { palette } = useTheme();
  const { id } = useParams({ strict: false }) as { id: string };

  const { data: manager, isLoading, isError } = useGetManagerById(id ?? null);
  const {
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
  } = useManagersDetails(manager ?? null);

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
        <MuiLink
          component={Link}
          to={EPageRoutes.MANAGERS}
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            color: palette.primary[600],
            fontWeight: 500,
            width: 'fit-content',
            fontSize: '0.875rem',
          }}
        >
          <ArrowBack sx={{ fontSize: '0.875rem' }} />
          Voltar para gestores
        </MuiLink>

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
            <ManagerEditForm
              managerId={manager.id}
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
