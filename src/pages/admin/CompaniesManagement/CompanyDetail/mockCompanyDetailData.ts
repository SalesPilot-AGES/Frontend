import type { CompanyInformationProps } from './CompanyInformation/CompanyInformation';

export interface MockCompanySummaryStats {
  managers: string;
  salesmen: string;
  totalMeetings: string;
  avgMeetingDuration: string;
}

export interface MockCompanyDetail {
  /** Corresponde ao parâmetro de rota `companyId`. */
  companyId: string;
  name: string;
  summary: MockCompanySummaryStats;
  information: Omit<CompanyInformationProps, 'onEdit'>;
}

const digitalSales: MockCompanyDetail = {
  companyId: '001',
  name: 'Digital Sales',
  summary: {
    managers: '2',
    salesmen: '12',
    totalMeetings: '104',
    avgMeetingDuration: '42 min',
  },
  information: {
    displayId: 'EMP-001',
    name: 'Digital Sales',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000, São Paulo, SP',
    planLabel: 'Pro',
    statusLabel: 'Ativo',
  },
};

const acme: MockCompanyDetail = {
  companyId: '002',
  name: 'Acme Comércio Ltda.',
  summary: {
    managers: '1',
    salesmen: '5',
    totalMeetings: '38',
    avgMeetingDuration: '28 min',
  },
  information: {
    displayId: 'EMP-002',
    name: 'Acme Comércio Ltda.',
    cnpj: '98.765.432/0001-10',
    phone: '(21) 4002-8922',
    address: 'Rua do Ouvidor, 50, Rio de Janeiro, RJ',
    planLabel: 'Básico',
    statusLabel: 'Em trial',
  },
};

const byId: Record<string, MockCompanyDetail> = {
  [digitalSales.companyId]: digitalSales,
  [acme.companyId]: acme,
};

export const getMockCompanyDetail = (companyId: string): MockCompanyDetail =>
  byId[companyId] ?? digitalSales;

/** Itens para botões de teste na listagem `/admin/empresas`. */
export const MOCK_COMPANY_DETAIL_LINKS = [
  { companyId: digitalSales.companyId, label: `Abrir: ${digitalSales.name}` },
  { companyId: acme.companyId, label: `Abrir: ${acme.name}` },
] as const;
