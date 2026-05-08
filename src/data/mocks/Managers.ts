export interface ManagerMock {
  id: string;
  companyId: string;
  name: string;
  role: string;
  email: string;
  active: boolean;
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
}

export const mockManagers: ManagerMock[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Ana Costa',
    role: 'manager',
    email: 'ana@digitalsales.com',
    active: true,
    createdAt: '2024-01-01',
    company: {
      id: '1',
      name: 'Digital Sales',
    },
  },
  {
    id: '2',
    companyId: '2',
    name: 'Carlos Souza',
    role: 'manager',
    email: 'carlos@vendamais.com',
    active: false,
    createdAt: '2024-01-02',
    company: {
      id: '2',
      name: 'Tech Corp',
    },
  },
];
