import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { ArrowBack, Business, Close, Email } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useGetSalesmanById } from '@services/queries/useSalesmen';
import { Link, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { ItemDetail } from '@UI/ItemDetail/ItemDetail';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { type JSX, useState } from 'react';

export const SalesmanDetail = (): JSX.Element => {
  const { palette } = useTheme();
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: salesman, isLoading, isError } = useGetSalesmanById(id ?? null);
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEdit = (): void => {
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
  };

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
          <ArrowBack sx={{ fontSize: '0.875rem' }} />
          Voltar para vendedores
        </MuiLink>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <IconBox iconName="salesman" theme="salesmen" />
          <PageHeader title={salesman.name} subtitle="" />
        </Box>

        <EntityDetailsCard
          title={EPageTitles.SALESMAN_INFORMATION}
          onEdit={isEditing ? undefined : handleStartEdit}
          headerRight={
            isEditing ? (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Close />}
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
              </Box>
            ) : undefined
          }
        >
          {isEditing ? (
            <Box
              sx={{
                border: `1px dashed ${palette.neutrals[300]}`,
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Modo de edição iniciado. A edição completa será implementada na
                FE-12.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: '2rem 4rem',
              }}
            >
              <ItemDetail label="ID do usuário" value={salesman.id} />

              <ItemDetail
                label="Empresa"
                value={salesman.company.name}
                icon={<Business fontSize="small" />}
              />

              <ItemDetail label="Nome do usuário" value={salesman.name} />

              <ItemDetail label="Status">
                <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
                  <StatusBadge active={salesman.active} />
                </Box>
              </ItemDetail>

              <ItemDetail
                label="Email de acesso"
                value={salesman.email}
                icon={<Email fontSize="small" />}
              />
            </Box>
          )}
        </EntityDetailsCard>
      </Box>
    </PageContainter>
  );
};
