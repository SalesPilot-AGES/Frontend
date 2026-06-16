import { fireEvent } from '@testing-library/react';
import { render, screen, waitFor } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@services/queries/useCompanies', () => ({
  useGetCompanies: vi.fn(() => ({ data: undefined })),
}));

vi.mock('@services/queries/useSalesman', () => ({
  useCreateSalesman: vi.fn(() => ({ mutate: vi.fn() })),
}));

vi.mock('@services/queries/useManagers', () => ({
  useGetManagerById: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
  })),
}));

vi.mock('@store/authStore', () => ({
  useAuthStore: vi.fn((selector: (state: { user: unknown }) => unknown) =>
    selector({
      user: {
        id: 'manager-uuid-1',
        name: 'gestor',
        email: 'gestor@empresa.com',
        role: 'manager',
      },
    })
  ),
  selectUser: (state: { user: unknown }) => state.user,
}));

import { useGetCompanies } from '@services/queries/useCompanies';
import { useGetManagerById } from '@services/queries/useManagers';
import { useCreateSalesman } from '@services/queries/useSalesman';

import { AddSalesmanModal } from './AddSalesmanModal';

const noop = vi.fn();

const mockCompanies = [
  { id: 'c1', name: 'Empresa Alpha', active: true },
  { id: 'c2', name: 'Empresa Beta', active: true },
];

const mockManagerData = {
  id: 'manager-uuid-1',
  name: 'Gestor Teste',
  email: 'gestor@empresa.com',
  company: { id: 'c1', name: 'Empresa Alpha' },
  active: true,
  preferences: null,
};

/** Fill the two plain text inputs (name + email) and click Salvar.
 *  MUI Autocomplete renders as role="combobox", not "textbox",
 *  so getAllByRole('textbox') gives only [name, email] for both variants. */
const fillAndSubmit = (name: string, email: string) => {
  const textboxes = screen.getAllByRole('textbox');
  fireEvent.change(textboxes[0], { target: { value: name } });
  fireEvent.change(textboxes[textboxes.length - 1], {
    target: { value: email },
  });
  fireEvent.click(screen.getByText('Salvar'));
};

// ─── ADMIN (default) ────────────────────────────────────────────────────────

describe('AddSalesmanModal — variant admin (default)', () => {
  it('renders the modal title when open', () => {
    render(<AddSalesmanModal open handleClose={noop} />);
    expect(screen.getByText('Adicionar vendedor')).toBeInTheDocument();
  });

  it('does not render modal content when closed', () => {
    render(<AddSalesmanModal open={false} handleClose={noop} />);
    expect(screen.queryByText('Nome do vendedor')).not.toBeInTheDocument();
  });

  it('renders all four form fields', () => {
    render(<AddSalesmanModal open handleClose={noop} />);
    expect(screen.getByText('Nome do vendedor')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Email de acesso')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('shows Empresa autocomplete enabled so admin can change it', () => {
    vi.mocked(useGetCompanies).mockReturnValue({
      data: { content: mockCompanies },
    } as unknown as ReturnType<typeof useGetCompanies>);

    render(<AddSalesmanModal open handleClose={noop} />);
    expect(screen.getByRole('combobox')).not.toBeDisabled();
  });

  it('shows empty-state helper text when no companies are available', () => {
    vi.mocked(useGetCompanies).mockReturnValue({
      data: { content: [] },
    } as unknown as ReturnType<typeof useGetCompanies>);

    render(<AddSalesmanModal open handleClose={noop} />);
    expect(
      screen.getByText('Nenhuma empresa disponível para vincular.')
    ).toBeInTheDocument();
  });

  it('does not use manager data for the company field', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="admin" />);
    // Admin combobox must be enabled regardless of manager data
    expect(screen.getByRole('combobox')).not.toBeDisabled();
  });

  it('submits with company object from the form selection', async () => {
    const mockMutate = vi.fn();
    vi.mocked(useCreateSalesman).mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof useCreateSalesman>);

    render(<AddSalesmanModal open handleClose={noop} variant="admin" />);
    fillAndSubmit('João Silva', 'joao@empresa.com');

    await waitFor(() => expect(mockMutate).toHaveBeenCalled());

    const [submittedData] = mockMutate.mock.calls[0] as [
      { company: { id: string } },
    ];
    expect(submittedData).toHaveProperty('company');
  });
});

// ─── MANAGER ────────────────────────────────────────────────────────────────

describe('AddSalesmanModal — variant manager', () => {
  it('renders the Empresa field visible and disabled when manager data is available', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it("pre-fills the company field with the manager's own company", async () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    await waitFor(() =>
      expect(screen.getByDisplayValue('Empresa Alpha')).toBeInTheDocument()
    );
  });

  it('does not render other companies as selectable options', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);
    // Even if useGetCompanies returned multiple companies, only the manager's
    // own company should appear as an option (dropdown is disabled anyway).
    vi.mocked(useGetCompanies).mockReturnValue({
      data: { content: mockCompanies },
    } as unknown as ReturnType<typeof useGetCompanies>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('disables the submit button while manager data is loading', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.getByText('Salvar').closest('button')).toBeDisabled();
  });

  it('disables the submit button when manager company cannot be loaded', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.getByText('Salvar').closest('button')).toBeDisabled();
  });

  it('shows error message in the modal body when manager query fails', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(
      screen.getByText('Não foi possível carregar a empresa do gestor.')
    ).toBeInTheDocument();
  });

  it('does not render the form when manager query fails', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.queryByText('Nome do vendedor')).not.toBeInTheDocument();
    expect(screen.queryByText('Email de acesso')).not.toBeInTheDocument();
  });

  it('shows error message in the modal body when manager has no company', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: { ...mockManagerData, company: undefined },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(
      screen.getByText('O gestor não possui empresa vinculada.')
    ).toBeInTheDocument();
  });

  it('does not render the form when manager has no company', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: { ...mockManagerData, company: undefined },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.queryByText('Nome do vendedor')).not.toBeInTheDocument();
    expect(screen.queryByText('Email de acesso')).not.toBeInTheDocument();
  });

  it('disables the submit button when manager has no company', () => {
    vi.mocked(useGetManagerById).mockReturnValue({
      data: { ...mockManagerData, company: undefined },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    expect(screen.getByText('Salvar').closest('button')).toBeDisabled();
  });

  it("submits with company_id from manager's official company", async () => {
    const mockMutate = vi.fn();
    vi.mocked(useCreateSalesman).mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof useCreateSalesman>);
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(<AddSalesmanModal open handleClose={noop} variant="manager" />);
    fillAndSubmit('João Silva', 'joao@empresa.com');

    await waitFor(() => expect(mockMutate).toHaveBeenCalled());

    const [submittedData] = mockMutate.mock.calls[0] as [
      { company: { id: string } },
    ];
    // useCreateSalesman maps company.id → company_id in the API payload
    expect(submittedData.company.id).toBe('c1');
  });

  it('calls handleClose on successful creation', async () => {
    const handleClose = vi.fn();
    const mockMutate = vi.fn().mockImplementation((_data, options) => {
      options?.onSuccess?.();
    });
    vi.mocked(useCreateSalesman).mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof useCreateSalesman>);
    vi.mocked(useGetManagerById).mockReturnValue({
      data: mockManagerData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetManagerById>);

    render(
      <AddSalesmanModal open handleClose={handleClose} variant="manager" />
    );
    fillAndSubmit('João Silva', 'joao@empresa.com');

    await waitFor(() => expect(handleClose).toHaveBeenCalled());
  });
});
