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
        description: { text: 'Ponto-chave identificado' },
        content: 'Cliente pediu proposta acelerada',
        created_at: '2026-05-07T10:00:00Z',
      },
      {
        id: '2',
        type: 'ACTION_ITEM',
        description: { text: 'Item de ação importante' },
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
    expect(screen.getByText('Ponto-chave identificado')).toBeInTheDocument();
    expect(screen.getByText('Item de ação importante')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<MeetingInsights insights={[]} isLoading={false} />);

    expect(
      screen.getByText('Nenhum insight disponível para esta reunião.')
    ).toBeInTheDocument();
  });
});
