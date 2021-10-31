export interface RegisterDto {
  username: string;
  password: string;
  role: string;
  remember_me: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
