import { EPlan } from '@data/enums/EPlan';
import { EStatus } from '@data/enums/EStatus';

export interface MockCompany {
  id: string;
  company: string;
  managers: number;
  sellers: number;
  meetings: number;
  plan: (typeof EPlan)[keyof typeof EPlan];
  status: (typeof EStatus)[keyof typeof EStatus];
}

export const mockCompanies: MockCompany[] = [
  {
    id: '1',
    company: 'Digital Sales',
    managers: 2,
    sellers: 12,
    meetings: 104,
    plan: EPlan.PRO,
    status: EStatus.ACTIVE,
  },
  {
    id: '2',
    company: 'InovaCorp',
    managers: 1,
    sellers: 9,
    meetings: 92,
    plan: EPlan.BASIC,
    status: EStatus.ACTIVE,
  },
  {
    id: '3',
    company: 'ProVendas',
    managers: 1,
    sellers: 7,
    meetings: 68,
    plan: EPlan.BASIC,
    status: EStatus.INACTIVE,
  },
  {
    id: '4',
    company: 'Smart Vendas',
    managers: 3,
    sellers: 14,
    meetings: 113,
    plan: EPlan.PRO,
    status: EStatus.ACTIVE,
  },
  {
    id: '5',
    company: 'Tech Solutions',
    managers: 4,
    sellers: 19,
    meetings: 125,
    plan: EPlan.ENTERPRISE,
    status: EStatus.ACTIVE,
  },
  {
    id: '6',
    company: 'Blue Wave',
    managers: 2,
    sellers: 8,
    meetings: 77,
    plan: EPlan.PRO,
    status: EStatus.INACTIVE,
  },
  {
    id: '7',
    company: 'Northern Leads',
    managers: 2,
    sellers: 10,
    meetings: 83,
    plan: EPlan.BASIC,
    status: EStatus.ACTIVE,
  },
  {
    id: '8',
    company: 'Global Route',
    managers: 5,
    sellers: 23,
    meetings: 142,
    plan: EPlan.ENTERPRISE,
    status: EStatus.ACTIVE,
  },
];
