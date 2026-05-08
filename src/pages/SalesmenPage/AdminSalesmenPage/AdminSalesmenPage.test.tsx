import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('@services/queries/useSalesmen', () => ({
  useGetSalesmen: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

import { AdminSalesmenPage } from './AdminSalesmenPage';

describe('AdminSalesmenPage', () => {
  it('renders salesmen title', () => {
    render(<AdminSalesmenPage />);
    expect(screen.getByText(EPageTitles.SALESMEN)).toBeInTheDocument();
  });

  it('renders add salesman button', () => {
    render(<AdminSalesmenPage />);
    expect(
      screen.getByRole('button', { name: /adicionar vendedor/i })
    ).toBeInTheDocument();
  });

  it('renders salesmen table toolbar', () => {
    render(<AdminSalesmenPage />);
    expect(screen.getByText('Lista de vendedores')).toBeInTheDocument();
  });
});
