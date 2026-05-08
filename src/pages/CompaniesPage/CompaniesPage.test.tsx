import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('@services/queries/useCompanies', () => ({
  useGetCompanies: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('./AddCompanyModal/AddCompanyModal', () => ({
  AddCompanyModal: () => <div data-testid="add-modal" />,
}));

import { CompaniesPage } from './CompaniesPage';

describe('CompaniesPage', () => {
  it('renders companies page title', () => {
    render(<CompaniesPage />);
    expect(screen.getByText(EPageTitles.COMPANIES)).toBeInTheDocument();
  });

  it('renders Add company button', () => {
    render(<CompaniesPage />);
    expect(
      screen.getByRole('button', { name: /adicionar empresa/i })
    ).toBeInTheDocument();
  });

  it('renders data table', () => {
    render(<CompaniesPage />);
    expect(screen.getByText('Lista de empresas')).toBeInTheDocument();
  });
});
