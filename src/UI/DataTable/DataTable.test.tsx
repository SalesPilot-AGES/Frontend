import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import { fireEvent, render, screen } from '@tests/testUtils';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './DataTableView';

interface CompanyRow {
  id: string;
  company: string;
  managers: number;
  sellers: number;
  meetings: number;
  plan: string;
  status: string;
}

const columns = [
  {
    header: 'Nome da empresa',
    accessor: 'company',
    icon: <ApartmentIcon fontSize="small" />,
  },
  {
    header: 'Gestores',
    accessor: 'managers',
    icon: <GroupsIcon fontSize="small" />,
  },
  {
    header: 'Vendedores',
    accessor: 'sellers',
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    header: 'Total de reuniões',
    accessor: 'meetings',
  },
  {
    header: 'Plano',
    accessor: 'plan',
    variant: 'badge' as const,
  },
  {
    header: 'Status',
    accessor: 'status',
    variant: 'badge' as const,
  },
] satisfies Array<{
  header: string;
  accessor: keyof CompanyRow;
  icon?: JSX.Element;
  variant?: 'text' | 'badge';
}>;

const rows: CompanyRow[] = [
  {
    id: '1',
    company: 'Digital Sales',
    managers: 2,
    sellers: 12,
    meetings: 104,
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '2',
    company: 'InovaCorp',
    managers: 1,
    sellers: 1,
    meetings: 92,
    plan: 'Básico',
    status: 'Ativo',
  },
  {
    id: '3',
    company: 'ProVendas',
    managers: 1,
    sellers: 1,
    meetings: 68,
    plan: 'Básico',
    status: 'Inativo',
  },
  {
    id: '4',
    company: 'Smart Vendas',
    managers: 1,
    sellers: 2,
    meetings: 113,
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '5',
    company: 'Tech Solutions',
    managers: 1,
    sellers: 3,
    meetings: 125,
    plan: 'Enterprise',
    status: 'Ativo',
  },
  {
    id: '6',
    company: 'Blue Wave',
    managers: 3,
    sellers: 4,
    meetings: 77,
    plan: 'Pro',
    status: 'Ativo',
  },
];

describe('DataTable', () => {
  it('renders rows and the fixed details column', () => {
    const onDetailsClick = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={rows.slice(0, 2)}
        getRowId={(row) => row.id}
        onDetailsClick={onDetailsClick}
      />
    );

    expect(screen.getByText(/Nome da\s+empresa/)).toBeInTheDocument();
    expect(screen.getByText('Detalhes')).toBeInTheDocument();
    expect(screen.getByText('Digital Sales')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /ver detalhes de/i })
    ).toHaveLength(2);
  });

  it('renders only five items and does not show page controls', () => {
    const onDetailsClick = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        onDetailsClick={onDetailsClick}
      />
    );

    expect(screen.getByText('Digital Sales')).toBeInTheDocument();
    expect(screen.queryByText('Blue Wave')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('calls details click with the row id', () => {
    const onDetailsClick = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={rows.slice(0, 1)}
        getRowId={(row) => row.id}
        onDetailsClick={onDetailsClick}
      />
    );

    fireEvent.click(screen.getByLabelText('Ver detalhes de 1'));

    expect(onDetailsClick).toHaveBeenCalledWith('1');
  });

  it('renders the loading skeleton state', () => {
    const onDetailsClick = vi.fn();

    render(
      <DataTable<CompanyRow>
        columns={columns}
        data={[]}
        getRowId={(row: CompanyRow) => row.id}
        onDetailsClick={onDetailsClick}
        loading
      />
    );

    expect(screen.getAllByTestId('datatable-loading-row')).toHaveLength(5);
  });

  it('renders the empty state', () => {
    const onDetailsClick = vi.fn();

    render(
      <DataTable<CompanyRow>
        columns={columns}
        data={[]}
        getRowId={(row) => row.id}
        onDetailsClick={onDetailsClick}
      />
    );

    expect(screen.getByText('Nenhum registro encontrado')).toBeInTheDocument();
    expect(
      screen.getByText('Quando houver itens para exibir, eles aparecerão aqui.')
    ).toBeInTheDocument();
  });

  it('renders toolbar with search and filter when props are provided', () => {
    const onDetailsClick = vi.fn();
    const onSearchChange = vi.fn();
    const onFilterChange = vi.fn();

    render(
      <DataTable<CompanyRow>
        columns={columns}
        data={rows.slice(0, 2)}
        getRowId={(row) => row.id}
        onDetailsClick={onDetailsClick}
        toolbarTitle="Lista de empresas"
        searchValue=""
        onSearchChange={onSearchChange}
        searchPlaceholder="Buscar empresa..."
        filterValue=""
        onFilterChange={onFilterChange}
        filterOptions={[
          { value: '', label: 'Todos' },
          { value: 'a', label: 'Opção A' },
        ]}
        filterPlaceholder="Filtrar..."
        filterAriaLabel="Filtro"
      />
    );

    expect(screen.getByText('Lista de empresas')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Buscar empresa...')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Filtro')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Buscar empresa...'), {
      target: { value: 'x' },
    });
    expect(onSearchChange).toHaveBeenCalledWith('x');
  });
});
