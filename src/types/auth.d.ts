export type UserRole = 'admin' | 'manager' | 'salesmen';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  company?: string;
}
