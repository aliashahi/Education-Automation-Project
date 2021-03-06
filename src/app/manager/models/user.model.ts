export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  gender?: string;
  profileImage?: string;
  role_id?: number;
}
