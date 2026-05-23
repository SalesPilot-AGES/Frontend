import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useGetCompanyById } from '@services/queries/useCompanies';
import { Link, useParams } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { StatCard } from '@UI/StatCard/StatCard';
import { pickCompanyValues } from '@utils/pickCompanyValues';
import type { SetStateAction } from 'react';
import { type JSX } from 'react';
import React from 'react';

import { CompanyInformation } from './CompanyInformation/CompanyInformation';
import { CompanyInformationEdit } from './CompanyInformation/CompanyInformationEdit/CompanyInformationEdit';
import type { CompanyInformationValues } from './CompanyInformation/CompanyInformationView/types';

export const CompanyDetail = (): JSX.Element => {
  const { palette } = useTheme();
  const { companyId } = useParams({ strict: false }) as { companyId: string };
  const { data: company, isLoading } = useGetCompanyById(companyId);
  const [editMode, setEditMode] = React.useState(false);
  const [draft, setDraft] = React.useState<
    CompanyInformationValues | undefined
  >(company ? pickCompanyValues(company) : undefined);

  React.useEffect(() => {
    if (company) {
      setDraft(pickCompanyValues(company));
    }
  }, [company]);

  const setDraftForEdit = React.useCallback(
    (action: SetStateAction<CompanyInformationValues>) => {
      setDraft((prev) => {
        if (!company) {
          return prev;
        }
        const base: CompanyInformationValues =
          prev ?? pickCompanyValues(company);
        return typeof action === 'function' ? action(base) : action;
      });
    },
    [company]
  );

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%', alignSelf: 'flex-start' }}>
        <MuiLink
          component={Link}
          to={EPageRoutes.COMPANIES}
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
          Voltar para empresas
        </MuiLink>

        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
          <IconButton
            aria-label="Detalhes da empresa"
            disableRipple
            sx={{
              width: 48,
              height: 48,
              p: 0,
              borderRadius: '0.75rem',
              bgcolor: palette.companies[200],
              color: palette.companies[500],
            }}
          >
            <ApartmentOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ minWidth: 0 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{ wordBreak: 'break-word' }}
            >
              {company?.name || 'Nome da empresa'}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          useFlexGap
          sx={{ width: '100%' }}
        >
          <StatCard
            iconName="manager"
            theme="managers"
            value={10}
            label={ECardLabel.MANAGERS}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="salesman"
            theme="salesmen"
            value={15}
            label={ECardLabel.SALESMAN}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={10}
            label={ECardLabel.TOTAL_MEETINGS}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="duration"
            theme="neutrals"
            value={'30 min'}
            label={ECardLabel.AVERAGE_MEETINGS_DURATION}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
        </Stack>

        {isLoading ? (
          <Typography>Carregando informações da empresa...</Typography>
        ) : company && !editMode ? (
          <CompanyInformation
            viewValues={draft ?? pickCompanyValues(company)}
            onEdit={() => setEditMode(true)}
          />
        ) : company ? (
          <CompanyInformationEdit
            draft={draft ?? pickCompanyValues(company)}
            setDraft={setDraftForEdit}
            onSaveSuccess={() => setEditMode(false)}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <Typography>Empresa não encontrada</Typography>
        )}
      </Stack>
    </PageContainter>
  );
};
