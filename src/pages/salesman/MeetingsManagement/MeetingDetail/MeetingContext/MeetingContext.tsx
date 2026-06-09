import { Box, Stack, Typography } from '@mui/material';
import { type JSX } from 'react';

import type { TMeetingDetail } from '../MeetingDetail.interface';

type TMeetingContextProps = {
  meeting: TMeetingDetail;
  summary: string | null;
  isSummaryLoading: boolean;
};

type TContextSectionProps = {
  label: string;
  value: string;
};

const resolveText = (value: string | null | undefined): string => {
  if (!value?.trim()) {
    return 'Não informado.';
  }

  return value;
};

const ContextSection = ({
  label,
  value,
}: TContextSectionProps): JSX.Element => (
  <Box sx={{ pl: '40px' }}>
    <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
      {value}
    </Typography>
  </Box>
);

export const MeetingContext = ({
  meeting,
  summary,
  isSummaryLoading,
}: TMeetingContextProps): JSX.Element => {
  const summaryText = isSummaryLoading
    ? 'Carregando resumo da reunião...'
    : resolveText(summary || null);

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2.5,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Informações configuradas pelo vendedor antes da reunião
      </Typography>

      <Stack spacing={2}>
        <ContextSection
          label="Objetivos"
          value={resolveText(meeting.objective)}
        />
        <ContextSection
          label="Dores"
          value={resolveText(meeting.client_needs)}
        />
        <ContextSection
          label="Interações anteriores"
          value={resolveText(meeting.previous_interactions)}
        />
        <ContextSection
          label="Concorrentes"
          value={resolveText(meeting.competitors_involved)}
        />
        <ContextSection label="Resumo / Transcrição" value={summaryText} />
      </Stack>
    </Stack>
  );
};
