import type { User } from '@store/authStore';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    company_name: 'SalesPilot',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    role: 'manager',
    company_name: 'Tech Corp',
  },
  {
    id: '3',
    name: 'Salesmen User',
    email: 'salesmen@example.com',
    role: 'salesmen',
    company_name: 'Tech Corp',
  },
];
