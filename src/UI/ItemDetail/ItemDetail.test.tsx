import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { ItemDetail } from './ItemDetail';

describe('ItemDetail', () => {
  it('renders the label', () => {
    render(<ItemDetail label="Email de acesso" value="test@example.com" />);
    expect(screen.getByText('Email de acesso')).toBeInTheDocument();
  });

  it('renders the value', () => {
    render(<ItemDetail label="Email de acesso" value="test@example.com" />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders children instead of value when provided', () => {
    render(
      <ItemDetail label="Status">
        <span data-testid="child-content">Ativo</span>
      </ItemDetail>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <ItemDetail
        label="Company"
        value="Acme"
        icon={<svg data-testid="company-icon" />}
      />
    );
    expect(screen.getByTestId('company-icon')).toBeInTheDocument();
  });

  it('renders without crashing when value is undefined', () => {
    render(<ItemDetail label="Empty field" />);
    expect(screen.getByText('Empty field')).toBeInTheDocument();
  });
});
