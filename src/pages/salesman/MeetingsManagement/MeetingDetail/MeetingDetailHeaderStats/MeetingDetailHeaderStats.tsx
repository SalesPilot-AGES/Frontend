import { EPageRoutes } from '@data/enums/EPageRoutes';
import { getSentimentConfig } from '@hooks/useSentiment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { IconButton, Link as MuiLink, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import { StatCard } from '@UI/StatCard/StatCard';
import { type JSX } from 'react';

import type { TMeetingDetail } from '../MeetingDetail.interface';

type TMeetingDetailHeaderStatsProps = {
  meeting: TMeetingDetail;
  sentimentScore?: number;
  palette: Theme['palette'];
  themePalette: Theme['palette'];
  responsiveValueFontSize: string;
};

export const MeetingDetailHeaderStats = ({
  meeting,
  sentimentScore,
  palette,
  themePalette,
  responsiveValueFontSize,
}: TMeetingDetailHeaderStatsProps): JSX.Element => {
  const formattedDate = meeting.scheduled_for
    ? new Date(meeting.scheduled_for).toLocaleDateString('pt-BR')
    : '';
  const durationMinutes = meeting.duration_seconds
    ? Math.floor(meeting.duration_seconds / 60)
    : 0;

  const sentimentPercent =
    sentimentScore != null ? Math.round(sentimentScore * 100) : undefined;
  const sentimentConfig = getSentimentConfig(sentimentPercent);
  const sentimentPalette = themePalette[
    sentimentConfig.theme as keyof Theme['palette']
  ] as Record<number, string> | undefined;

  return (
    <>
      <MuiLink
        component={Link}
        to={EPageRoutes.MEETINGS}
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
        Voltar para reuniões
      </MuiLink>

      <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
        <IconButton
          disableRipple
          sx={{
            width: 48,
            height: 48,
            p: 0,
            borderRadius: '0.75rem',
            bgcolor: palette.meetings[200],
            color: palette.meetings[500],
            '&:hover': {
              bgcolor: palette.meetings[100],
            },
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
            {formattedDate} {durationMinutes > 0 && `- ${durationMinutes} min`}
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
          iconName="real_estate_agent"
          theme="primary"
          value={meeting.client.name}
          label="Nome do cliente"
          sx={{
            flex: '1 1 0',
            minWidth: { xs: '100%', sm: 160 },
            '& .MuiTypography-root:nth-of-type(1)': {
              fontSize: responsiveValueFontSize,
            },
          }}
        />
        <StatCard
          iconName="salesman"
          theme="salesmen"
          value={meeting.seller.name}
          label="Vendedor responsável"
          sx={{
            flex: '1 1 0',
            minWidth: { xs: '100%', sm: 160 },
            '& .MuiTypography-root:nth-of-type(1)': {
              fontSize: responsiveValueFontSize,
            },
          }}
        />
        <StatCard
          iconName="company"
          theme="companies"
          value={meeting.client.client_company_name}
          label="Empresa responsável"
          sx={{
            flex: '1 1 0',
            minWidth: { xs: '100%', sm: 160 },
            '& .MuiTypography-root:nth-of-type(1)': {
              fontSize: responsiveValueFontSize,
            },
          }}
        />
        <StatCard
          iconName={sentimentConfig.iconName}
          theme={sentimentConfig.theme}
          value={`${sentimentPercent ?? 0}%`}
          label="Sentimento da reunião"
          sx={{
            flex: '1 1 0',
            minWidth: { xs: '100%', sm: 160 },
            '& .MuiTypography-root:nth-of-type(1)': {
              fontSize: responsiveValueFontSize,
            },
            '& .MuiStack-root > :first-child': {
              backgroundColor: sentimentPalette?.[100],
              color: sentimentPalette?.[300],
            },
            '& .MuiStack-root > :first-child svg': {
              color: sentimentPalette?.[300],
            },
          }}
        />
      </Stack>
    </>
  );
};
