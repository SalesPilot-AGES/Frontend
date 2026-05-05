import type { TSalesman } from '@services/models/SalesmanSchema';
import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    useParams: () => ({ id: 'sls-1' }),
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  };
});

vi.mock('@services/queries/useSalesmen', () => ({
  useGetSalesmanById: vi.fn(),
}));

vi.mock('@pages/PageNotFound/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found" />,
}));

import { useGetSalesmanById } from '@services/queries/useSalesmen';

import { SalesmanDetail } from './SalesmanDetail';

const mockQuery = useGetSalesmanById as ReturnType<typeof vi.fn>;

const salesman: TSalesman = {
  id: 'sls-1',
  name: 'Marta Costa',
  email: 'marta@digitalsales.com',
  company: { id: 'co-1', name: 'Digital Sales' },
  active: true,
  preferences: null,
};

describe('SalesmanDetail', () => {
  it('shows loading state', () => {
    mockQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<SalesmanDetail />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('shows PageNotFound on error', () => {
    mockQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<SalesmanDetail />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('renders salesman detail information', () => {
    mockQuery.mockReturnValue({
      data: salesman,
      isLoading: false,
      isError: false,
    });

    render(<SalesmanDetail />);

    expect(screen.getByText(/voltar para vendedores/i)).toBeInTheDocument();
    expect(screen.getAllByText('Marta Costa').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('marta@digitalsales.com')).toBeInTheDocument();
    expect(screen.getByText('Digital Sales')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('transitions to edit mode when Editar is clicked', () => {
    mockQuery.mockReturnValue({
      data: salesman,
      isLoading: false,
      isError: false,
    });

    render(<SalesmanDetail />);

    fireEvent.click(screen.getByRole('button', { name: /editar/i }));

    expect(screen.getByText(/modo de edição iniciado/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
  });
});
