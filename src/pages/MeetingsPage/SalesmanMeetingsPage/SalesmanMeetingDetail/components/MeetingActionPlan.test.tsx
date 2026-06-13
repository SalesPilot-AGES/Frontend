import type { TMeetingActionItem } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MeetingActionPlan } from './MeetingActionPlan';

describe('MeetingActionPlan', () => {
  it('renders action items as single text rows', () => {
    const actionItems: TMeetingActionItem[] = [
      {
        description: 'Enviar proposta revisada',
        responsible: 'Marta Costa',
        due_date: '2026-03-22',
      },
      'Agendar reunião técnica (prazo: 2 dias)',
    ];

    render(<MeetingActionPlan actionItems={actionItems} isLoading={false} />);

    expect(screen.getByText('Enviar proposta revisada')).toBeInTheDocument();
    expect(
      screen.getByText('Agendar reunião técnica (prazo: 2 dias)')
    ).toBeInTheDocument();
    expect(screen.queryByText(/Responsável:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Prazo:/)).not.toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<MeetingActionPlan actionItems={[]} isLoading={false} />);

    expect(
      screen.getByText('Nenhum plano de ação disponível para esta reunião.')
    ).toBeInTheDocument();
  });
});
