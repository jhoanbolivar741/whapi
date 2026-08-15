import type { User } from "./data/user";

export interface AuthResponse {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface EditProfileCredentials {
  name?: string;
  email?: string;
}
