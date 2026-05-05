import type { TManager } from '@services/models/ManagerSchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { ManagerInformationView } from './ManagerInformationView';

const manager: TManager = {
  id: 'mgr-1',
  name: 'Ana Lima',
  email: 'ana@example.com',
  company: { id: 'co-1', name: 'Tech Corp' },
  active: true,
  preferences: null,
};

describe('ManagerInformationView', () => {
  it('renders manager ID', () => {
    render(<ManagerInformationView manager={manager} />);
    expect(screen.getByText('mgr-1')).toBeInTheDocument();
  });

  it('renders manager name', () => {
    render(<ManagerInformationView manager={manager} />);
    expect(screen.getByText('Ana Lima')).toBeInTheDocument();
  });

  it('renders manager email', () => {
    render(<ManagerInformationView manager={manager} />);
    expect(screen.getByText('ana@example.com')).toBeInTheDocument();
  });

  it('renders company name', () => {
    render(<ManagerInformationView manager={manager} />);
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders active status badge', () => {
    render(<ManagerInformationView manager={manager} />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('renders inactive status badge', () => {
    render(<ManagerInformationView manager={{ ...manager, active: false }} />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});
