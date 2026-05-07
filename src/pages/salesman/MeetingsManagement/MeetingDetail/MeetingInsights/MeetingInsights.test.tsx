import type { TMeetingRealtimeInsight } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MeetingInsights } from './MeetingInsights';

describe('MeetingInsights', () => {
  it('renders insights as single text rows', () => {
    const insights: TMeetingRealtimeInsight[] = [
      {
        id: '1',
        type: 'KEY_POINT',
        description: { text: 'Cliente pediu proposta acelerada' },
        content: 'Cliente pediu proposta acelerada',
        created_at: '2026-05-07T10:00:00Z',
      },
      {
        id: '2',
        type: 'ACTION_ITEM',
        description: { text: 'Objeção sobre prazo de implementação' },
        content: 'Objeção sobre prazo de implementação',
        created_at: '2026-05-07T10:05:00Z',
      },
    ];

    render(<MeetingInsights insights={insights} isLoading={false} />);

    expect(
      screen.getByText('Cliente pediu proposta acelerada')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Objeção sobre prazo de implementação')
    ).toBeInTheDocument();
    expect(screen.queryByText('Prioridade alta')).not.toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<MeetingInsights insights={[]} isLoading={false} />);

    expect(
      screen.getByText('Nenhum insight disponível para esta reunião.')
    ).toBeInTheDocument();
  });
});
