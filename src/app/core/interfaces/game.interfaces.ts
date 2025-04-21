import {GameSession} from './game-session.interfaces';
import {User} from './user.interface';

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
