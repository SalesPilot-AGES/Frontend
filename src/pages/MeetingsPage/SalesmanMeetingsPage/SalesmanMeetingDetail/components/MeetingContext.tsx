import { Box, Stack, Typography } from '@mui/material';
import type { TMeetingDetail } from '@services/models/MeetingSchema';
import { type JSX } from 'react';

type TMeetingContextProps = {
  meeting: TMeetingDetail;
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
}: TMeetingContextProps): JSX.Element => {
  const preAnalysis = meeting.pre_analysis;
  const keyPoints = preAnalysis?.key_points?.join(' • ');
  const possibleObjections = preAnalysis?.possible_objections?.join(' • ');

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
          label="Cliente"
          value={`${meeting.client.name} — ${meeting.client.client_company_name}`}
        />
        <ContextSection
          label="Participantes"
          value={`${meeting.client.name} (cliente) e ${meeting.seller.name} (vendedor)`}
        />
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
        {preAnalysis ? (
          <>
            <ContextSection
              label="Estratégia recomendada"
              value={resolveText(preAnalysis.recommended_strategy?.focus)}
            />
            <ContextSection
              label="Pontos-chave da pré-análise"
              value={resolveText(keyPoints)}
            />
            <ContextSection
              label="Possíveis objeções"
              value={resolveText(possibleObjections)}
            />
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};
