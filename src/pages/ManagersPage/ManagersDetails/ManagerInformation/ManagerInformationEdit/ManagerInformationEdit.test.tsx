import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { ManagerInformationEdit } from './ManagerInformationEdit';

const editForm = {
  name: 'Carlos Silva',
  companyId: 'co-1',
  email: 'carlos@example.com',
  active: true,
};

const companyOptions = [
  { id: 'co-1', name: 'Tech Corp' },
  { id: 'co-2', name: 'Sales Inc' },
];

const defaultProps = {
  managerId: 'mgr-1',
  editForm,
  isCompanyValid: true,
  companyOptions,
  onFieldChange: vi.fn(),
  onStatusChange: vi.fn(),
};

describe('ManagerInformationEdit', () => {
  it('renders manager ID', () => {
    render(<ManagerInformationEdit {...defaultProps} />);
    expect(screen.getByText('mgr-1')).toBeInTheDocument();
  });

  it('renders name field with current value', () => {
    render(<ManagerInformationEdit {...defaultProps} />);
    expect(screen.getByDisplayValue('Carlos Silva')).toBeInTheDocument();
  });

  it('renders email field with current value', () => {
    render(<ManagerInformationEdit {...defaultProps} />);
    expect(screen.getByDisplayValue('carlos@example.com')).toBeInTheDocument();
  });

  it('calls onFieldChange when name is changed', () => {
    const onFieldChange = vi.fn();
    render(
      <ManagerInformationEdit {...defaultProps} onFieldChange={onFieldChange} />
    );
    const nameInput = screen.getByDisplayValue('Carlos Silva');
    fireEvent.change(nameInput, { target: { value: 'Carlos Updated' } });
    expect(onFieldChange).toHaveBeenCalledWith('name', 'Carlos Updated');
  });

  it('shows active status text when active', () => {
    render(<ManagerInformationEdit {...defaultProps} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('shows inactive status text when not active', () => {
    render(
      <ManagerInformationEdit
        {...defaultProps}
        editForm={{ ...editForm, active: false }}
      />
    );
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('calls onStatusChange when switch is toggled', () => {
    const onStatusChange = vi.fn();
    render(
      <ManagerInformationEdit
        {...defaultProps}
        onStatusChange={onStatusChange}
      />
    );
    const switchInput = screen.getByRole('switch');
    fireEvent.click(switchInput);
    expect(onStatusChange).toHaveBeenCalledWith(false);
  });
});
