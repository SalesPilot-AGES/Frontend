import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { TMeetingRealtimeInsight } from '@services/models/MeetingSchema';
import type { JSX } from 'react';

type TMeetingInsightsProps = {
  insights: TMeetingRealtimeInsight[];
  isLoading: boolean;
};

const TYPE_LABELS: Record<TMeetingRealtimeInsight['type'], string> = {
  KEY_POINT: 'Ponto-chave',
  ACTION_ITEM: 'Ação',
};

export const MeetingInsights = ({
  insights,
  isLoading,
}: TMeetingInsightsProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2.5,
        minHeight: '18.75rem',
        overflowY: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Análises e observações geradas pela IA durante a reunião
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 6,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      ) : insights.length > 0 ? (
        <Stack spacing={2}>
          {insights.map((insight) => (
            <Box
              key={insight.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: '21px',
                borderRadius: '0.6rem',
                bgcolor: palette.salesmen[100],
                border: `1px solid ${palette.salesmen[200]}`,
              }}
            >
              {insight.type === 'ACTION_ITEM' ? (
                <PlaylistAddCheckCircleOutlinedIcon
                  sx={{
                    color: palette.salesmen[500],
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                    mt: '2px',
                  }}
                />
              ) : (
                <AutoAwesomeRoundedIcon
                  sx={{
                    color: palette.salesmen[500],
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                    mt: '2px',
                  }}
                />
              )}
              <Stack spacing={0.5} flex={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={TYPE_LABELS[insight.type]}
                    size="small"
                    sx={{
                      bgcolor: palette.salesmen[200],
                      color: palette.salesmen[700],
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: '20px',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {insight.description.text}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: palette.neutrals[700], lineHeight: 1.5 }}
                >
                  {insight.content}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nenhum insight disponível para esta reunião.
        </Typography>
      )}
    </Stack>
  );
};
