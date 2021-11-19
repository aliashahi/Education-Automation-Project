export interface UserSearchDto {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  role?: 'S' | 'T' | 'M';
}
