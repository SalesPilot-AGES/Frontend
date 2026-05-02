import { EPageRoutes } from '@data/enums/EPageRoutes';
import { ArrowBack } from '@mui/icons-material';
import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useGetManagerById } from '@services/queries/useManagers';
import { Link, useParams } from '@tanstack/react-router';
import { IconBox } from '@UI/IconBox/IconBox';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { type JSX } from 'react';

import { ManagerInformation } from './ManagerInformation/ManagerInformation';

export const ManagersDetails = (): JSX.Element => {
  const { palette } = useTheme();
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: manager, isLoading, isError } = useGetManagerById(id ?? null);

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <IconBox iconName="manager" theme="managers" />
          <PageHeader title={manager.name} subtitle="" />
        </Box>

        <ManagerInformation manager={manager} />
      </Box>
    </PageContainter>
  );
};
