import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { EntityDetailsCard } from './EntityDetailsCard';

describe('EntityDetailsCard', () => {
  it('renders title', () => {
    render(
      <EntityDetailsCard title="Informações do gestor">
        <p>content</p>
      </EntityDetailsCard>
    );
    expect(screen.getByText('Informações do gestor')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <EntityDetailsCard title="Title">
        <span data-testid="child">child content</span>
      </EntityDetailsCard>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders Edit button when onEdit is provided and no headerRight', () => {
    render(
      <EntityDetailsCard title="Title" onEdit={vi.fn()}>
        <p>content</p>
      </EntityDetailsCard>
    );
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const onEdit = vi.fn();
    render(
      <EntityDetailsCard title="Title" onEdit={onEdit}>
        <p>content</p>
      </EntityDetailsCard>
    );
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('does not render Edit button when onEdit is not provided', () => {
    render(
      <EntityDetailsCard title="Title">
        <p>content</p>
      </EntityDetailsCard>
    );
    expect(
      screen.queryByRole('button', { name: /editar/i })
    ).not.toBeInTheDocument();
  });

  it('renders headerRight instead of Edit button when provided', () => {
    render(
      <EntityDetailsCard
        title="Title"
        onEdit={vi.fn()}
        headerRight={<button>Custom Action</button>}
      >
        <p>content</p>
      </EntityDetailsCard>
    );
    expect(
      screen.getByRole('button', { name: /custom action/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /editar/i })
    ).not.toBeInTheDocument();
  });
});
