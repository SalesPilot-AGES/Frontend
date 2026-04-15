import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { mockManagers } from '@data/mocks/Managers';
import { ArrowBack, Business, Email } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useNavigate, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX } from 'react';

export const AdminManagersDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { id } = useParams({ from: EPageRoutes.ADMIN_MANAGERS_DETAILS });

  const manager = mockManagers.find((managerItem) => managerItem.id === id);

  const handleGoBack = (): void => {
    navigate({ to: EPageRoutes.ADMIN_MANAGERS });
  };

  const handleEdit = (): void => {
    // FE-08
  };

  if (!manager) {
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
          onEdit={handleEdit}
        >
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
        </EntityDetailsCard>
      </Box>
    </PageContainter>
  );
};
