import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useGetSalesmanById } from '@services/queries/useSalesmen';
import { useAdminSalesmenDetailsEdit } from '@store/hooks/useAdminSalesmenDetailsEdit';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import { Link, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { type JSX, useState } from 'react';

import { SalesmanInformationEdit } from './SalesmanInformationEdit/SalesmanInformationEdit';
import { SalesmanInformationView } from './SalesmanInformationView/SalesmanInformationView';

export const SalesmanDetail = (): JSX.Element => {
  const { palette } = useTheme();
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: salesman, isLoading, isError } = useGetSalesmanById(id ?? null);
  const role = useCurrentUserRole();
  const canEdit = role === 'admin';
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEdit = (): void => {
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
  };

  const {
    editForm,
    isEditFormValid,
    companyOptions,
    handleSaveEdit,
    handleFieldChange,
    handleStatusChange,
  } = useAdminSalesmenDetailsEdit(
    salesman ?? null,
    isEditing,
    handleCancelEdit
  );

  if (isLoading) {
    return (
      <PageContainter>
        <Typography>Carregando informações do vendedor...</Typography>
      </PageContainter>
    );
  }

  if (isError || !salesman) {
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
          to={EPageRoutes.SALESMEN}
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
          <ArrowBackIcon sx={{ fontSize: '0.875rem' }} />
          Voltar para vendedores
        </MuiLink>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <IconBox iconName="salesman" theme="salesmen" />
          <PageHeader title={salesman.name} subtitle="" />
        </Box>

        <EntityDetailsCard
          title={EPageTitles.SALESMAN_INFORMATION}
          onEdit={isEditing || !canEdit ? undefined : handleStartEdit}
          headerRight={
            isEditing ? (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveEdit}
                  disabled={!isEditFormValid}
                >
                  Salvar
                </Button>
              </Box>
            ) : undefined
          }
        >
          {isEditing && salesman && editForm ? (
            <SalesmanInformationEdit
              salesmanId={salesman.id}
              editForm={editForm}
              companyOptions={companyOptions}
              onFieldChange={handleFieldChange}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <SalesmanInformationView salesman={salesman} />
          )}
        </EntityDetailsCard>
      </Box>
    </PageContainter>
  );
};
