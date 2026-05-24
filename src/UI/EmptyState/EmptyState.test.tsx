import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="Sem dados" description="Tente outro filtro." />);

    expect(screen.getByText('Sem dados')).toBeInTheDocument();
    expect(screen.getByText('Tente outro filtro.')).toBeInTheDocument();
  });
});
