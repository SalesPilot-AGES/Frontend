import { fireEvent, render, screen } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
  useParams: vi.fn(() => ({ id: 'salesman-1' })),
}));

vi.mock('@pages/PageNotFound/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="page-not-found" />,
}));

vi.mock('@services/queries/useSalesmen', () => ({
  useGetSalesmanById: vi.fn(),
}));

vi.mock('@store/hooks/useAdminSalesmenDetailsEdit', () => ({
  useAdminSalesmenDetailsEdit: vi.fn(),
}));

vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUserRole: vi.fn(),
}));

import { useGetSalesmanById } from '@services/queries/useSalesmen';
import { useAdminSalesmenDetailsEdit } from '@store/hooks/useAdminSalesmenDetailsEdit';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import type React from 'react';

import { SalesmanDetail } from './SalesmanDetail';

const mockGetSalesmanById = useGetSalesmanById as ReturnType<typeof vi.fn>;
const mockEditHook = useAdminSalesmenDetailsEdit as ReturnType<typeof vi.fn>;
const mockRole = useCurrentUserRole as ReturnType<typeof vi.fn>;

const mockSalesman = {
  id: 'salesman-1',
  name: 'João Silva',
  email: 'joao@empresa.com',
  company: { id: 'company-1', name: 'Empresa X' },
  active: true,
};

const mockEditForm = {
  name: 'João Silva',
  email: 'joao@empresa.com',
  companyId: 'company-1',
  active: true,
};

const defaultHookReturn = {
  editForm: mockEditForm,
  isEditFormValid: true,
  companyOptions: [{ id: 'company-1', name: 'Empresa X' }],
  handleSaveEdit: vi.fn(),
  handleFieldChange: vi.fn(),
  handleStatusChange: vi.fn(),
};

describe('SalesmanDetail', () => {
  beforeEach(() => {
    mockEditHook.mockReturnValue(defaultHookReturn);
  });

  it('shows loading state while fetching', () => {
    mockRole.mockReturnValue('admin');
    mockGetSalesmanById.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });
    render(<SalesmanDetail />);
    expect(
      screen.getByText('Carregando informações do vendedor...')
    ).toBeInTheDocument();
  });

  it('shows PageNotFound on API error', () => {
    mockRole.mockReturnValue('admin');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });
    render(<SalesmanDetail />);
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });

  it('shows PageNotFound when salesman is undefined', () => {
    mockRole.mockReturnValue('admin');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
    });
    render(<SalesmanDetail />);
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });

  it('shows edit button for admin', () => {
    mockRole.mockReturnValue('admin');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('shows edit button for manager', () => {
    mockRole.mockReturnValue('manager');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('enters edit mode when edit button is clicked', () => {
    mockRole.mockReturnValue('manager');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('returns to view mode when cancel is clicked', () => {
    mockRole.mockReturnValue('manager');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(
      screen.queryByRole('button', { name: /cancelar/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /salvar/i })
    ).not.toBeInTheDocument();
  });

  it('passes isAdmin=false to hook for manager (no company fetch)', () => {
    mockRole.mockReturnValue('manager');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    expect(mockEditHook).toHaveBeenCalledWith(
      mockSalesman,
      false,
      expect.any(Function),
      false
    );
  });

  it('passes isAdmin=true to hook for admin (company fetch enabled)', () => {
    mockRole.mockReturnValue('admin');
    mockGetSalesmanById.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockSalesman,
    });
    render(<SalesmanDetail />);
    expect(mockEditHook).toHaveBeenCalledWith(
      mockSalesman,
      false,
      expect.any(Function),
      true
    );
  });
});
