import { EPlan } from '@data/enums/EPlan';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { CompanyInformationView } from './CompanyInformationView';

const props = {
  id: 'abc-123',
  name: 'Acme Corp',
  tax_id: '12.345.678/0001-99',
  plan: EPlan.PRO,
  active: true,
};

describe('CompanyInformationView', () => {
  it('renders company ID', () => {
    render(<CompanyInformationView {...props} />);
    expect(screen.getByText('abc-123')).toBeInTheDocument();
  });

  it('renders company name', () => {
    render(<CompanyInformationView {...props} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders tax_id (CNPJ)', () => {
    render(<CompanyInformationView {...props} />);
    expect(screen.getByText('12.345.678/0001-99')).toBeInTheDocument();
  });

  it('renders PlanBadge', () => {
    render(<CompanyInformationView {...props} />);
    expect(screen.getByText(EPlan.PRO)).toBeInTheDocument();
  });

  it('renders StatusBadge as active', () => {
    render(<CompanyInformationView {...props} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('renders StatusBadge as inactive', () => {
    render(<CompanyInformationView {...props} active={false} />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});
