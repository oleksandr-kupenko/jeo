export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum GameRole {
  GAME_MASTER = 'GAME_MASTER',
  PLAYER = 'PLAYER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
