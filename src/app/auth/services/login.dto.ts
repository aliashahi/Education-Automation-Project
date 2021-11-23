export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password2: string;
  role: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
