export interface MockCompany {
  id: string;
  company: string;
  managers: number;
  sellers: number;
  meetings: number;
  plan: 'Basico' | 'Pro' | 'Enterprise';
  status: 'Ativo' | 'Inativo';
}

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    company: 'Digital Sales',
    managers: 2,
    sellers: 12,
    meetings: 104,
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '2',
    company: 'InovaCorp',
    managers: 1,
    sellers: 9,
    meetings: 92,
    plan: 'Basico',
    status: 'Ativo',
  },
  {
    id: '3',
    company: 'ProVendas',
    managers: 1,
    sellers: 7,
    meetings: 68,
    plan: 'Basico',
    status: 'Inativo',
  },
  {
    id: '4',
    company: 'Smart Vendas',
    managers: 3,
    sellers: 14,
    meetings: 113,
    plan: 'Pro',
    status: 'Ativo',
  },
  {
    id: '5',
    company: 'Tech Solutions',
    managers: 4,
    sellers: 19,
    meetings: 125,
    plan: 'Enterprise',
    status: 'Ativo',
  },
  {
    id: '6',
    company: 'Blue Wave',
    managers: 2,
    sellers: 8,
    meetings: 77,
    plan: 'Pro',
    status: 'Inativo',
  },
  {
    id: '7',
    company: 'Northern Leads',
    managers: 2,
    sellers: 10,
    meetings: 83,
    plan: 'Basico',
    status: 'Ativo',
  },
  {
    id: '8',
    company: 'Global Route',
    managers: 5,
    sellers: 23,
    meetings: 142,
    plan: 'Enterprise',
    status: 'Ativo',
  },
];
