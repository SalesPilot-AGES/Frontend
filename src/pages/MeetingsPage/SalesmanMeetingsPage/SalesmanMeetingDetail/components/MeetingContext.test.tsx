import type { TMeetingDetail } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MeetingContext } from './MeetingContext';

const mockMeeting: TMeetingDetail = {
  id: '99999999-8888-7777-6666-555555555555',
  title: 'Reuniao de descoberta',
  status: 'SCHEDULED',
  meeting_type: 'ONLINE',
  objective: 'Entender dores e objetivos',
  client_needs: 'Melhorar eficiencia',
  previous_interactions: 'Contato inicial via email',
  competitors_involved: 'Concorrente X',
  scheduled_for: '2026-05-04T14:21:48.07065',
  started_at: null,
  ended_at: null,
  duration_seconds: 1800,
  seller: {
    id: 'e5f6a7b8-c9d0-1234-5678-90abcdef1234',
    name: 'Saulo Souza',
    email: 'saulo@digitalsales.com',
  },
  client: {
    id: '11111111-2222-3333-4444-555555555555',
    name: 'Marina Lima',
    client_company_name: 'Alfa Industrial',
    sector: 'Manufacturing',
    overall_sentiment: 8,
  },
  pre_analysis: {
    id: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    recommended_strategy: {
      focus: 'exploration',
    },
    key_points: ['Entender processos atuais', 'Mapear stakeholders'],
    possible_objections: ['Orcamento limitado', 'Prazo curto'],
    created_at: '2026-05-04T14:21:48.073165',
  },
  created_at: '2026-05-04T14:21:48.07065',
};

describe('MeetingContext', () => {
  it('renders context sections and summary', () => {
    render(
      <MeetingContext
        meeting={mockMeeting}
        summary="Resumo de teste"
        isSummaryLoading={false}
      />
    );

    expect(screen.getByText('Objetivos')).toBeInTheDocument();
    expect(screen.getByText('Dores')).toBeInTheDocument();
    expect(screen.getByText('Interações anteriores')).toBeInTheDocument();
    expect(screen.getByText('Concorrentes')).toBeInTheDocument();
    expect(screen.getByText('Resumo / Transcrição')).toBeInTheDocument();
    expect(screen.getByText('Resumo de teste')).toBeInTheDocument();
  });

  it('renders fallback summary when summary is unavailable', () => {
    render(
      <MeetingContext
        meeting={mockMeeting}
        summary={null}
        isSummaryLoading={false}
      />
    );

    expect(screen.getByText('Não informado.')).toBeInTheDocument();
  });
});
