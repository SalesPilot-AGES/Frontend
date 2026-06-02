import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { TMeetingActionItem } from '@services/models/MeetingSchema';
import type { JSX } from 'react';

type TMeetingActionPlanProps = {
  actionItems: TMeetingActionItem[];
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
  actionItems,
  isLoading,
}: TMeetingActionPlanProps): JSX.Element => {
  const { palette } = useTheme();

  const normalizedActionItems = actionItems
    .map((item, index) => normalizeActionItem(item, index))
    .filter((item): item is TNormalizedActionItem => item !== null);

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
      ) : normalizedActionItems.length > 0 ? (
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
          Nenhum plano de ação disponível para esta reunião.
        </Typography>
      )}
    </Stack>
  );
};
