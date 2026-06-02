import type { TManager } from '@services/models/ManagerSchema';
import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./useManagerInformation', () => ({
  useManagerInformation: vi.fn(),
}));
vi.mock('./ManagerInformationView/ManagerInformationView', () => ({
  ManagerInformationView: ({ manager }: { manager: TManager }) => (
    <div data-testid="info-view">{manager.name}</div>
  ),
}));
vi.mock('./ManagerInformationEdit/ManagerInformationEdit', () => ({
  ManagerInformationEdit: () => <div data-testid="info-edit" />,
}));

import { ManagerInformation } from './ManagerInformation';
import { useManagerInformation } from './useManagerInformation';

const mockHook = useManagerInformation as ReturnType<typeof vi.fn>;

const manager: TManager = {
  id: 'mgr-1',
  name: 'Ana Lima',
  email: 'ana@example.com',
  company: { id: 'co-1', name: 'Tech Corp' },
  active: true,
  preferences: null,
};

const baseHookReturn = {
  companyOptions: [],
  isCompanyValid: true,
  isEditFormValid: true,
  isEditing: false,
  editForm: null,
  updateManagerMutation: { isPending: false, mutate: vi.fn() },
  handleEdit: vi.fn(),
  handleCancelEdit: vi.fn(),
  handleSaveEdit: vi.fn(),
  handleFieldChange: vi.fn(),
  handleStatusChange: vi.fn(),
};

describe('ManagerInformation', () => {
  it('renders view mode by default', () => {
    mockHook.mockReturnValue(baseHookReturn);
    render(<ManagerInformation manager={manager} />);
    expect(screen.getByTestId('info-view')).toBeInTheDocument();
    expect(screen.queryByTestId('info-edit')).not.toBeInTheDocument();
  });

  it('renders edit mode when isEditing and editForm are set', () => {
    mockHook.mockReturnValue({
      ...baseHookReturn,
      isEditing: true,
      editForm: {
        name: 'Ana',
        companyId: 'co-1',
        email: 'a@e.com',
        active: true,
      },
    });
    render(<ManagerInformation manager={manager} />);
    expect(screen.getByTestId('info-edit')).toBeInTheDocument();
    expect(screen.queryByTestId('info-view')).not.toBeInTheDocument();
  });

  it('shows Edit button in view mode', () => {
    mockHook.mockReturnValue(baseHookReturn);
    render(<ManagerInformation manager={manager} />);
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('calls handleEdit when Edit button is clicked', () => {
    const handleEdit = vi.fn();
    mockHook.mockReturnValue({ ...baseHookReturn, handleEdit });
    render(<ManagerInformation manager={manager} />);
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(handleEdit).toHaveBeenCalledOnce();
  });

  it('shows Cancelar and Salvar buttons in edit mode', () => {
    mockHook.mockReturnValue({
      ...baseHookReturn,
      isEditing: true,
      editForm: {
        name: 'Ana',
        companyId: 'co-1',
        email: 'a@e.com',
        active: true,
      },
    });
    render(<ManagerInformation manager={manager} />);
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });
});
