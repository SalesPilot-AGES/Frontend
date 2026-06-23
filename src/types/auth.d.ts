export type UserRole = 'admin' | 'manager' | 'salesmen';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company_id?: string;
  company_name?: string;
}
