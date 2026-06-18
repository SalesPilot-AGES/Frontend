import type { TMeetingPostAnalysis } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MeetingActionPlan } from './MeetingActionPlan';

describe('MeetingActionPlan', () => {
  it('renders action items as single text rows', () => {
    const postAnalysis: TMeetingPostAnalysis = {
      id: 'analysis-1',
      meeting_id: 'meeting-1',
      summary: 'Cliente demonstrou interesse.',
      action_items: [
        {
          description: 'Enviar proposta revisada',
          responsible: 'Marta Costa',
          due_date: '2026-03-22',
        },
        'Agendar reunião técnica (prazo: 2 dias)',
      ],
      sentiment_analysis: {
        overall: 'positive',
        score: 0.86,
      },
    };

    render(<MeetingActionPlan postAnalysis={postAnalysis} isLoading={false} />);

    expect(
      screen.getByText('Cliente demonstrou interesse.')
    ).toBeInTheDocument();
    expect(screen.getByText('Enviar proposta revisada')).toBeInTheDocument();
    expect(
      screen.getByText('Agendar reunião técnica (prazo: 2 dias)')
    ).toBeInTheDocument();
    expect(screen.getByText('Positivo — 86%')).toBeInTheDocument();
    expect(screen.queryByText(/Responsável:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Prazo:/)).not.toBeInTheDocument();
  });

  it('renders processing state while post-analysis is unavailable', () => {
    render(<MeetingActionPlan postAnalysis={null} isLoading={false} />);

    expect(
      screen.getByText('Pós-análise em processamento')
    ).toBeInTheDocument();
  });
});
