import {User} from '../../../auth/interfaces/auth.interface';

export interface Game {
  id: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator?: User;
  categories?: Category[];
  questionRows?: QuestionRow[];
  gameSession?: GameSession;
}

export interface Category {
  id: string;
  name: string;
  order: number;
  gameId: string;
  questions: Question[];
}

export interface QuestionRow {
  id: string;
  value: number;
  order: number;
  gameId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  rowId: string;
  answeredByUserId?: string;
}

export interface QuestionRow {
  id: string;
  value: number;
  order: number;
  gameId: string;
  questions: Question[];
}

export interface GameSession {
  id: string;
  startedAt: string;
  endedAt?: string;
  currentTurn?: string;
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
