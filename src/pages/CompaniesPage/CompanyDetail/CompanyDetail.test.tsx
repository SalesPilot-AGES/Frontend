import type { TCompany } from '@services/models/CompanySchema';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    useParams: () => ({ companyId: 'co-1' }),
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  };
});

vi.mock('@services/queries/useCompanies', () => ({
  useGetCompanyById: vi.fn(),
}));

vi.mock('./CompanyInformation/CompanyInformation', () => ({
  CompanyInformation: () => <div data-testid="company-info" />,
}));

vi.mock(
  './CompanyInformation/CompanyInformationEdit/CompanyInformationEdit',
  () => ({
    CompanyInformationEdit: () => <div data-testid="company-edit" />,
  })
);

import { useGetCompanyById } from '@services/queries/useCompanies';

import { CompanyDetail } from './CompanyDetail';

const mockQuery = useGetCompanyById as ReturnType<typeof vi.fn>;

const company: TCompany = {
  id: 'co-1',
  name: 'Acme Corp',
  tax_id: '12.345.678/0001-99',
  plan: 'PRO',
  active: true,
};

describe('CompanyDetail', () => {
  it('shows loading text', () => {
    mockQuery.mockReturnValue({ data: undefined, isLoading: true });
    render(<CompanyDetail />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('shows not found text when no company', () => {
    mockQuery.mockReturnValue({ data: undefined, isLoading: false });
    render(<CompanyDetail />);
    expect(screen.getByText(/empresa não encontrada/i)).toBeInTheDocument();
  });

  it('renders CompanyInformation in view mode', () => {
    mockQuery.mockReturnValue({ data: company, isLoading: false });
    render(<CompanyDetail />);
    expect(screen.getByTestId('company-info')).toBeInTheDocument();
  });

  it('renders company name as heading', () => {
    mockQuery.mockReturnValue({ data: company, isLoading: false });
    render(<CompanyDetail />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders back link', () => {
    mockQuery.mockReturnValue({ data: company, isLoading: false });
    render(<CompanyDetail />);
    expect(screen.getByText(/voltar para empresas/i)).toBeInTheDocument();
  });
});
