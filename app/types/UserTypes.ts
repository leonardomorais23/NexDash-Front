export interface User {
  id: number;
  roles: string[];
  permissions: string[];
  name: string;
  email: string;
  avatar?: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}