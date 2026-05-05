import { EPlan } from '@data/enums/EPlan';
import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { CompanyInformation } from './CompanyInformation';

const viewValues = {
  id: 'id-1',
  name: 'Test Corp',
  tax_id: '11.222.333/0001-44',
  plan: EPlan.BASIC,
  active: true,
};

describe('CompanyInformation', () => {
  it('renders section heading', () => {
    render(<CompanyInformation viewValues={viewValues} />);
    expect(screen.getByText('Informações da empresa')).toBeInTheDocument();
  });

  it('renders company name from viewValues', () => {
    render(<CompanyInformation viewValues={viewValues} />);
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
  });

  it('renders Edit button', () => {
    render(<CompanyInformation viewValues={viewValues} onEdit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<CompanyInformation viewValues={viewValues} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('renders PlanBadge', () => {
    render(<CompanyInformation viewValues={viewValues} />);
    expect(screen.getByText(EPlan.BASIC)).toBeInTheDocument();
  });

  it('renders StatusBadge', () => {
    render(<CompanyInformation viewValues={viewValues} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });
});
