import {Game, Question} from './game.interfaces';

export enum GAME_SESSION_USER_ROLE {
  host = 'host',
  gamemaster = 'gamemaster',
  player = 'player'
}

export interface GameSession {
  id: string;
  name: string;
  defaultTimer: number;
  startedAt: string;
  endedAt?: string;
  currentTurn?: string;
  userRole: GAME_SESSION_USER_ROLE;
  gameId: string;
  game: Game;
  questions?: GameSessionQuestion[];
}

export interface GameSessionQuestion {
  id: string;
  isRevealed: boolean;
  isAnswered: boolean;
  answeredByUserId?: string;
  gameSessionId: string;
  questionId: string;
  question?: Question;
}
