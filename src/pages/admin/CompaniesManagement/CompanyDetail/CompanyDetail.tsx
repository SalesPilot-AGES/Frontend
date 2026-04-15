import { EPageRoutes } from '@data/enums/EPageRoutes';
import { ArrowBack } from '@mui/icons-material';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import {
  Box,
  IconButton,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { getRouteApi, Link } from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import type { JSX, ReactNode } from 'react';

import { CompanyInformation } from './CompanyInformation/CompanyInformation';
import { getMockCompanyDetail } from './mockCompanyDetailData';

const companyDetailRouteApi = getRouteApi(EPageRoutes.ADMIN_COMPANY_DETAIL);

/** Placeholder até o componente Card compartilhado ficar pronto. */
const MockSummaryCard = ({
  icon,
  iconBg,
  iconColor,
  value,
  label,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
}): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        flex: '1 1 0',
        minWidth: { xs: '100%', sm: 160 },
        p: 2.5,
        border: `1px solid ${palette.neutrals[200]}`,
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '0.75rem',
            bgcolor: iconBg,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          color={palette.neutrals[600]}
          fontWeight={500}
        >
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
};

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
          <MockSummaryCard
            icon={<ManageAccountsOutlinedIcon />}
            iconBg="#EDE7F6"
            iconColor="#5E35B1"
            value={mock.summary.managers}
            label="Gestores"
          />
          <MockSummaryCard
            icon={<PersonOutlineOutlinedIcon />}
            iconBg="#FCE4EC"
            iconColor="#C2185B"
            value={mock.summary.salesmen}
            label="Vendedores"
          />
          <MockSummaryCard
            icon={<CalendarMonthOutlinedIcon />}
            iconBg="#FFF3E0"
            iconColor="#E65100"
            value={mock.summary.totalMeetings}
            label="Total de reuniões"
          />
          <MockSummaryCard
            icon={<ScheduleOutlinedIcon />}
            iconBg={palette.neutrals[200]}
            iconColor={palette.neutrals[700]}
            value={mock.summary.avgMeetingDuration}
            label="Duração média das reuniões"
          />
        </Stack>

        <CompanyInformation {...mock.information} />
      </Stack>
    </PageContainter>
  );
};
