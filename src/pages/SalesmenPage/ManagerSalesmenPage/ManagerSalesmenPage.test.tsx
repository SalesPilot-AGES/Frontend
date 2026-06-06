import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@services/queries/useSalesmen', () => ({
  useGetSalesmen: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('../AddSalesmanModal/AddSalesmanModal', () => ({
  AddSalesmanModal: () => <div data-testid="add-salesman-modal" />,
}));

import { useGetSalesmen } from '@services/queries/useSalesmen';
import { fireEvent } from '@tests/testUtils';

import { ManagerSalesmenPage } from './ManagerSalesmenPage';

const mockSalesmen = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    company: { id: 'c1', name: 'Empresa Alpha' },
    active: true,
    average_sentiment: 0.8,
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@empresa.com',
    company: { id: 'c1', name: 'Empresa Alpha' },
    active: false,
    average_sentiment: 0.3,
  },
  {
    id: '3',
    name: 'Carlos Lima',
    email: 'carlos@outra.com',
    company: { id: 'c2', name: 'Empresa Beta' },
    active: true,
    average_sentiment: null,
  },
];

describe('ManagerSalesmenPage', () => {
  it('renders salesmen title', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByText(EPageTitles.SALESMEN)).toBeInTheDocument();
  });

  it('renders add salesman button', () => {
    render(<ManagerSalesmenPage />);
    expect(
      screen.getByRole('button', { name: /adicionar vendedor/i })
    ).toBeInTheDocument();
  });

  it('renders salesmen table toolbar', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByText('Lista de vendedores')).toBeInTheDocument();
  });

  it('renders stat card labels', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByText(ECardLabel.ACTIVE_SALESMAN)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.INACTIVE_SALESMAN)).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.AVERAGE_FEELING)).toBeInTheDocument();
  });

  it('renders stat card values with salesmen data', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: mockSalesmen },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders zero counts when data is empty', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: [] },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(2);
  });

  it('renders salesmen rows in the table', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: mockSalesmen },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    expect(screen.getByText('Carlos Lima')).toBeInTheDocument();
  });

  it('filters salesmen by search on name', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: mockSalesmen },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    const searchInput = screen.getByPlaceholderText('Buscar vendedor...');
    fireEvent.change(searchInput, { target: { value: 'João' } });

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.queryByText('Maria Souza')).not.toBeInTheDocument();
    expect(screen.queryByText('Carlos Lima')).not.toBeInTheDocument();
  });

  it('filters salesmen by search on email', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: mockSalesmen },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    const searchInput = screen.getByPlaceholderText('Buscar vendedor...');
    fireEvent.change(searchInput, { target: { value: 'carlos@outra.com' } });

    expect(screen.getByText('Carlos Lima')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
    expect(screen.queryByText('Maria Souza')).not.toBeInTheDocument();
  });

  it('renders email column header', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
  });

  it('does not render company name column', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.queryByText('Nome da empresa')).not.toBeInTheDocument();
  });

  it('renders email values in the table', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: { content: mockSalesmen },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    expect(screen.getByText('joao@empresa.com')).toBeInTheDocument();
    expect(screen.getByText('maria@empresa.com')).toBeInTheDocument();
    expect(screen.getByText('carlos@outra.com')).toBeInTheDocument();
  });

  it('renders the AddSalesmanModal', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByTestId('add-salesman-modal')).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    vi.mocked(useGetSalesmen).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useGetSalesmen>);

    render(<ManagerSalesmenPage />);
    expect(screen.getByText(EPageTitles.SALESMEN)).toBeInTheDocument();
  });
});
