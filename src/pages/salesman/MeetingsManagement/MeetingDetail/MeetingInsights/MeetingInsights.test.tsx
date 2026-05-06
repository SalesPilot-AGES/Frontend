import type { TMeetingInsight } from '@services/models/MeetingSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MeetingInsights } from './MeetingInsights';

describe('MeetingInsights', () => {
  it('renders insights as single text rows', () => {
    const insights: TMeetingInsight[] = [
      {
        text: 'Cliente pediu proposta acelerada',
        category: 'Prioridade alta',
      },
      'Objeção sobre prazo de implementação',
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
