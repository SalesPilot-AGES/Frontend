import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { TMeetingInsight } from '@services/models/MeetingSchema';
import type { JSX } from 'react';

type TMeetingInsightsProps = {
  insights: TMeetingInsight[];
  isLoading: boolean;
};

type TNormalizedInsight = {
  id: string;
  text: string;
};

const normalizeInsight = (
  insight: TMeetingInsight,
  index: number
): TNormalizedInsight | null => {
  if (typeof insight === 'string') {
    const normalizedText = insight.trim();
    if (!normalizedText) return null;

    return {
      id: `insight-${index}`,
      text: normalizedText,
    };
  }

  const text = (insight.text ?? insight.insight ?? '').trim();
  if (!text) return null;

  return {
    id: `insight-${index}`,
    text,
  };
};

export const MeetingInsights = ({
  insights,
  isLoading,
}: TMeetingInsightsProps): JSX.Element => {
  const { palette } = useTheme();

  const normalizedInsights = insights
    .map((insight, index) => normalizeInsight(insight, index))
    .filter((item): item is TNormalizedInsight => item !== null);

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
      ) : normalizedInsights.length > 0 ? (
        <Stack spacing={2}>
          {normalizedInsights.map((insight) => (
            <Box
              key={insight.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: '21px',
                borderRadius: '0.6rem',
                bgcolor: palette.salesmen[100],
                border: `1px solid ${palette.salesmen[200]}`,
              }}
            >
              <AutoAwesomeRoundedIcon
                sx={{
                  color: palette.salesmen[500],
                  width: '24px',
                  height: '24px',
                  fontSize: '24px',
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: palette.neutrals[700], lineHeight: 1.5 }}
              >
                {insight.text}
              </Typography>
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
