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
