import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { getSentimentConfig } from '@hooks/useSentiment';
import { ArrowBack, Close, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { useGetSalesmanById } from '@services/queries/useSalesmen';
import { useAdminSalesmenDetailsEdit } from '@store/hooks/useAdminSalesmenDetailsEdit';
import { Link, useParams } from '@tanstack/react-router';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { IconBox } from '@UI/IconBox/IconBox';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { type JSX, useState } from 'react';

import { formatAverageSentiment } from '../AdminSalesmenPage/salesmenColumns';
import { SalesmanInformationEdit } from './SalesmanInformationEdit/SalesmanInformationEdit';
import { SalesmanInformationView } from './SalesmanInformationView/SalesmanInformationView';

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

  const sentimentValue = salesman.average_sentiment ?? undefined;
  const sentimentConfig = getSentimentConfig(sentimentValue);
  const sentimentColorMap: Record<string, string> = {
    success: palette.success[300],
    warning: palette.warning[400],
    error: palette.error[300],
    neutrals: palette.neutrals[500],
  };
  const sentimentColor =
    sentimentColorMap[sentimentConfig.theme] ?? palette.neutrals[500];

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

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing="0.75rem"
        >
          <IconBox
            iconName={sentimentConfig.iconName}
            theme={sentimentConfig.theme}
          />
          <Typography fontWeight={600} fontSize="1.5rem" color={sentimentColor}>
            {typeof sentimentValue === 'number'
              ? formatAverageSentiment(sentimentValue)
              : '-'}
          </Typography>
        </Stack>

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
                <Button
                  variant="contained"
                  startIcon={<Save />}
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
