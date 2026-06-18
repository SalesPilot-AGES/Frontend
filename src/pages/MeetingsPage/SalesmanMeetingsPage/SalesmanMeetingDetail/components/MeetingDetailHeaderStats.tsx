import { EPageRoutes } from '@data/enums/EPageRoutes';
import { getSentimentConfig } from '@hooks/useSentiment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Chip,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { TMeetingDetail } from '@services/models/MeetingSchema';
import { Link } from '@tanstack/react-router';
import { StatCard } from '@UI/StatCard/StatCard';
import {
  formatMeetingStatus,
  formatMeetingType,
  getAnalysisSentimentPercent,
} from '@utils/meetingFormatters';
import { type JSX } from 'react';

type TMeetingDetailHeaderStatsProps = {
  meeting: TMeetingDetail;
  sentimentScore?: number;
};

export const MeetingDetailHeaderStats = ({
  meeting,
  sentimentScore,
}: TMeetingDetailHeaderStatsProps): JSX.Element => {
  const { palette } = useTheme();
  const formattedDate = meeting.scheduled_for
    ? new Date(meeting.scheduled_for).toLocaleDateString('pt-BR')
    : '';
  const durationMinutes = meeting.duration_seconds
    ? Math.floor(meeting.duration_seconds / 60)
    : 0;

  const sentimentPercent = getAnalysisSentimentPercent(sentimentScore);
  const sentimentConfig = getSentimentConfig(sentimentPercent);
  const statValueSx = {
    flex: '1 1 0',
    minWidth: { xs: '100%', sm: 160 },
    '& .MuiTypography-root:nth-of-type(1)': {
      fontSize: { xs: '1rem', lg: '1.25rem' },
    },
  };

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

      <Stack direction="column" spacing={0.75} sx={{ minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <Typography
            variant="h1"
            component="h1"
            sx={{ wordBreak: 'break-word', fontSize: '1.5rem' }}
          >
            {meeting.title}
          </Typography>
          <Chip
            label={formatMeetingStatus(meeting.status)}
            size="small"
            sx={{
              bgcolor: palette.primary[100],
              color: palette.primary[700],
              fontWeight: 600,
            }}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {formattedDate} {durationMinutes > 0 && `- ${durationMinutes} min`}
        </Typography>
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
          sx={statValueSx}
        />
        <StatCard
          iconName="company"
          theme="primary"
          value={meeting.client.sector || 'Não informado'}
          label="Setor do cliente"
          sx={statValueSx}
        />
        <StatCard
          iconName="meeting"
          theme="meetings"
          value={formatMeetingType(meeting.meeting_type)}
          label="Tipo de reunião"
          sx={statValueSx}
        />
        <StatCard
          iconName={sentimentConfig.iconName}
          theme={sentimentConfig.theme}
          value={sentimentPercent == null ? '-' : `${sentimentPercent}%`}
          label="Sentimento da reunião"
          sx={statValueSx}
        />
      </Stack>
    </>
  );
};
