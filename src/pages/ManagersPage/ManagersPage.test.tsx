import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('@services/queries/useManagers', () => ({
  useGetManagers: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('./AddManagerModal/AddManagerModal', () => ({
  AddManagerModal: () => <div data-testid="add-modal" />,
}));

import { ManagersPage } from './ManagersPage';

describe('ManagersPage', () => {
  it('renders managers page title', () => {
    render(<ManagersPage />);
    expect(screen.getByText(EPageTitles.MANAGERS)).toBeInTheDocument();
  });

  it('renders Add manager button', () => {
    render(<ManagersPage />);
    expect(
      screen.getByRole('button', { name: /adicionar gestor/i })
    ).toBeInTheDocument();
  });

  it('renders data table toolbar', () => {
    render(<ManagersPage />);
    expect(screen.getByText('Lista de gestores')).toBeInTheDocument();
  });
});
