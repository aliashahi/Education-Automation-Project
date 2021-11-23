export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface UpdateProfileDto {
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
