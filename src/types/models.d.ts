export interface Company {
  id: string;
  name: string;
  // ... other fields
}

export interface ManagerDetails {
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
