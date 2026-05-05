import { EPlan } from '@data/enums/EPlan';
import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./useCompanyInformationEdit', () => ({
  useCompanyInformationEdit: vi.fn(() => ({
    palette: { neutrals: { 200: '#eee' } },
    control: {},
    handleSubmit: (fn: unknown) => () => fn,
    onSubmit: vi.fn(),
    isValid: true,
    isSubmitting: false,
    labelColor: '#666',
    valueColor: '#333',
  })),
}));

vi.mock('./CompanyInformationEditFields/CompanyInformationEditFields', () => ({
  CompanyInformationEditFields: () => <div data-testid="edit-fields" />,
}));

import { CompanyInformationEdit } from './CompanyInformationEdit';

const draft = {
  id: 'co-1',
  name: 'Acme',
  tax_id: '12.345.678/0001-99',
  plan: EPlan.PRO,
  active: true,
};

describe('CompanyInformationEdit', () => {
  it('renders edit heading', () => {
    render(<CompanyInformationEdit draft={draft} setDraft={vi.fn()} />);
    expect(
      screen.getByText('Editar informações da empresa')
    ).toBeInTheDocument();
  });

  it('renders Cancelar and Salvar buttons', () => {
    render(<CompanyInformationEdit draft={draft} setDraft={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('calls onCancel when Cancelar is clicked', () => {
    const onCancel = vi.fn();
    render(
      <CompanyInformationEdit
        draft={draft}
        setDraft={vi.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('renders edit fields component', () => {
    render(<CompanyInformationEdit draft={draft} setDraft={vi.fn()} />);
    expect(screen.getByTestId('edit-fields')).toBeInTheDocument();
  });
});
