import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type {
  TMeetingActionItem,
  TMeetingPostAnalysis,
} from '@services/models/MeetingSchema';
import {
  formatSentimentLabel,
  getAnalysisSentimentPercent,
} from '@utils/meetingFormatters';
import type { JSX } from 'react';

type TMeetingActionPlanProps = {
  postAnalysis: TMeetingPostAnalysis | null;
  isLoading: boolean;
};

type TNormalizedActionItem = {
  id: string;
  text: string;
};

const normalizeActionItem = (
  actionItem: TMeetingActionItem,
  index: number
): TNormalizedActionItem | null => {
  if (typeof actionItem === 'string') {
    const normalizedText = actionItem.trim();
    if (!normalizedText) return null;

    return {
      id: `action-item-${index}`,
      text: normalizedText,
    };
  }

  const text = (actionItem.description ?? actionItem.text ?? '').trim();
  if (!text) return null;

  return {
    id: `action-item-${index}`,
    text,
  };
};

export const MeetingActionPlan = ({
  postAnalysis,
  isLoading,
}: TMeetingActionPlanProps): JSX.Element => {
  const { palette } = useTheme();

  const actionItems =
    postAnalysis?.action_plan ?? postAnalysis?.action_items ?? [];
  const normalizedActionItems = actionItems
    .map((item, index) => normalizeActionItem(item, index))
    .filter((item): item is TNormalizedActionItem => item !== null);
  const sentimentPercent = getAnalysisSentimentPercent(
    postAnalysis?.sentiment_analysis?.score
  );

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
        Ações recomendadas pela IA com base na análise da reunião
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
      ) : postAnalysis ? (
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.75 }}>
              Resumo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postAnalysis.summary || 'Resumo não disponível.'}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Itens de ação
            </Typography>
            {normalizedActionItems.length > 0 ? (
              <Stack spacing={2}>
                {normalizedActionItems.map((actionItem) => (
                  <Box
                    key={actionItem.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: '21px',
                      borderRadius: '0.6rem',
                      bgcolor: palette.primary[100],
                      border: `1px solid ${palette.primary[200]}`,
                    }}
                  >
                    <RocketLaunchIcon
                      sx={{
                        color: palette.primary[500],
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
                      {actionItem.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhum item de ação disponível para esta reunião.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.75 }}>
              Análise de sentimento
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: '21px',
                borderRadius: '0.6rem',
                bgcolor: palette.primary[100],
                border: `1px solid ${palette.primary[200]}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: palette.neutrals[700], lineHeight: 1.5 }}
              >
                {postAnalysis.sentiment_analysis
                  ? `${formatSentimentLabel(postAnalysis.sentiment_analysis.overall)} — ${sentimentPercent}%`
                  : 'Análise de sentimento não disponível.'}
              </Typography>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Box
          sx={{
            p: 3,
            borderRadius: '0.75rem',
            bgcolor: palette.neutrals[100],
            border: `1px solid ${palette.neutrals[200]}`,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            Pós-análise em processamento
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            O resumo e o plano de ação aparecerão aqui quando o processamento
            terminar.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
