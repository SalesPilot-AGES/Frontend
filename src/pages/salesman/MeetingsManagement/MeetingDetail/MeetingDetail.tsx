import { EPageRoutes } from '@data/enums/EPageRoutes';
import { ArrowBack } from '@mui/icons-material';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import {
  Box,
  CircularProgress,
  IconButton,
  Link as MuiLink,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { PageNotFound } from '@pages/PageNotFound/PageNotFound';
import { MeetingListItemApiSchema } from '@services/models/MeetingSchema';
import { useGetMeetingById } from '@services/queries/useMeetings';
import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';
import React from 'react';
import { z } from 'zod';

type TMeetingDetail = z.infer<typeof MeetingListItemApiSchema> & {
  client: { overall_sentiment?: number };
};

const MeetingContext = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Contexto da Reunião</Typography>
  </Box>
);

const MeetingInsights = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Insights na Reunião</Typography>
  </Box>
);

const MeetingActionPlan = (): JSX.Element => (
  <Box p={3}>
    <Typography>Conteúdo: Plano de Ação</Typography>
  </Box>
);

export const MeetingDetail = (): JSX.Element => {
  const { palette } = useTheme();

  const { meetingId } = useParams({ strict: false }) as { meetingId: string };
  const search = useSearch({ strict: false }) as Record<string, string>;

  const currentTab = search.tab || 'context';
  const navigate = useNavigate();

  const {
    data: rawMeeting,
    isLoading,
    isError,
  } = useGetMeetingById(meetingId ?? null);

  const meeting = rawMeeting as TMeetingDetail | undefined;

  if (isLoading) {
    return (
      <PageContainter>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      </PageContainter>
    );
  }

  if (isError || !meeting) {
    return <PageNotFound />;
  }

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ): void => {
    navigate({
      search: (old: Record<string, string>) => ({ ...old, tab: newValue }),
      replace: true,
    });
  };

  const formattedDate = meeting.scheduled_for
    ? new Date(meeting.scheduled_for).toLocaleDateString('pt-BR')
    : '';
  const durationMinutes = meeting.duration_seconds
    ? Math.floor(meeting.duration_seconds / 60)
    : 0;

  return (
    <PageContainter>
      <Stack spacing={3} sx={{ width: '100%', alignSelf: 'flex-start' }}>
        <MuiLink
          component={Link}
          to={EPageRoutes.SALESMAN_MEETINGS}
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
          Voltar para reuniões
        </MuiLink>

        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
          <IconButton
            aria-label="Detalhes da reunião"
            disableRipple
            sx={{
              width: 48,
              height: 48,
              p: 0,
              borderRadius: '0.75rem',
              bgcolor: palette.primary[100],
              color: palette.primary[500],
            }}
          >
            <EventNoteOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>

          <Stack direction="column" spacing={0.5} sx={{ minWidth: 0 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ wordBreak: 'break-word', fontSize: '1.5rem' }}
            >
              {meeting.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formattedDate}{' '}
              {durationMinutes > 0 && `- ${durationMinutes} min`}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          useFlexGap
          sx={{ width: '100%', alignItems: 'stretch' }}
        >
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={meeting.client.name}
            label="Nome do cliente"
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="salesman"
            theme="salesmen"
            value={meeting.seller.name}
            label="Vendedor responsável"
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="company"
            theme="companies"
            value={meeting.client.client_company_name}
            label="Empresa responsável"
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
          <StatCard
            iconName="dashboard"
            theme="success"
            value={`${meeting.client.overall_sentiment ?? 0}%`}
            label="Sentimento da reunião"
            sx={{ flex: '1 1 0', minWidth: { xs: '100%', sm: 160 } }}
          />
        </Stack>

        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '1rem',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="CONTEXTO DA REUNIÃO" value="context" />
              <Tab label="INSIGHTS NA REUNIÃO" value="insights" />
              <Tab label="PLANO DE AÇÃO" value="plan" />
            </Tabs>
          </Box>

          <Box minHeight="300px">
            {currentTab === 'context' && <MeetingContext />}
            {currentTab === 'insights' && <MeetingInsights />}
            {currentTab === 'plan' && <MeetingActionPlan />}
          </Box>
        </Box>
      </Stack>
    </PageContainter>
  );
};
