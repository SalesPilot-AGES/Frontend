import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { SalesmanInformationEdit } from './SalesmanInformationEdit';

const mockEditForm = {
  name: 'João Silva',
  email: 'joao@empresa.com',
  companyId: 'company-1',
  active: true,
};

const mockCompanyOptions = [{ id: 'company-1', name: 'Empresa X' }];

const defaultProps = {
  salesmanId: 'salesman-1',
  editForm: mockEditForm,
  companyOptions: mockCompanyOptions,
  onFieldChange: vi.fn(),
  onStatusChange: vi.fn(),
};

describe('SalesmanInformationEdit', () => {
  it('pre-fills name field', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
  });

  it('pre-fills email field', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.getByDisplayValue('joao@empresa.com')).toBeInTheDocument();
  });

  it('shows salesman ID as read-only', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.getByText('salesman-1')).toBeInTheDocument();
  });

  it('shows active status', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('shows inactive status when active=false', () => {
    render(
      <SalesmanInformationEdit
        {...defaultProps}
        editForm={{ ...mockEditForm, active: false }}
      />
    );
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('does not show role field', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.queryByText(/papel|role/i)).not.toBeInTheDocument();
  });

  it('shows company select by default (admin)', () => {
    render(<SalesmanInformationEdit {...defaultProps} />);
    expect(screen.getByText('Empresa')).toBeInTheDocument();
  });

  it('removes company field for manager (isCompanyEditable=false)', () => {
    render(
      <SalesmanInformationEdit {...defaultProps} isCompanyEditable={false} />
    );
    expect(screen.queryByText('Empresa')).not.toBeInTheDocument();
  });

  it('shows company select when isCompanyEditable=true', () => {
    render(
      <SalesmanInformationEdit {...defaultProps} isCompanyEditable={true} />
    );
    expect(screen.getByText('Empresa')).toBeInTheDocument();
  });

  it('calls onFieldChange when name is edited', () => {
    const onFieldChange = vi.fn();
    render(
      <SalesmanInformationEdit
        {...defaultProps}
        onFieldChange={onFieldChange}
      />
    );
    const nameInput = screen.getByDisplayValue('João Silva');
    fireEvent.change(nameInput, { target: { value: 'Maria Souza' } });

    expect(onFieldChange).toHaveBeenCalledWith('name', 'Maria Souza');
  });
});
