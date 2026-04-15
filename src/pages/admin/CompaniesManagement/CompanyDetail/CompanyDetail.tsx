import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { ArrowBack } from '@mui/icons-material';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import {
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { getRouteApi, Link } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';

import { getMockCompanyDetail } from '../../../../data/mocks/CompanyDetail';
import { CompanyInformation } from './CompanyInformation/CompanyInformation';

const companyDetailRouteApi = getRouteApi(EPageRoutes.ADMIN_COMPANY_DETAIL);

export const CompanyDetail = (): JSX.Element => {
  const { palette } = useTheme();
  const { companyId } = companyDetailRouteApi.useParams();
  const mock = getMockCompanyDetail(companyId);

  return (
    <PageContainter>
      <Stack
        spacing={3}
        sx={{ width: '100%', maxWidth: 1200, alignSelf: 'flex-start' }}
      >
        <MuiLink
          component={Link}
          to={EPageRoutes.ADMIN_COMPANIES}
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
              {mock.name}
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
            value={mock.summary.managers}
            label={ECardLabel.MANAGERS}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="salesman"
            theme="salesmen"
            value={mock.summary.salesmen}
            label={ECardLabel.SALESMAN}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={mock.summary.totalMeetings}
            label={ECardLabel.TOTAL_MEETINGS}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={mock.summary.avgMeetingDuration}
            label={ECardLabel.AVERAGE_MEETINGS_DURATION}
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
        </Stack>

        <CompanyInformation {...mock.information} />
      </Stack>
    </PageContainter>
  );
};
