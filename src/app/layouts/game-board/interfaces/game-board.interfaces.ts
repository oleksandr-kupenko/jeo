import {User} from '../../../auth/interfaces/auth.interface';
import { GameSession } from '../../create-game-session/interfaces/gama-session.interface';

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

export interface QuestionUpdatedResponse extends Question {
  category: {
    id: string;
    name: string;
    order: number;
    gameId: string;
  };
  
  questionRow : {
    id: string;
    value: number;
    order: number;
    gameId: string;
  };
}

export interface QuestionUpdate {
  questionId: string;
  question: string | null;
  answer: string | null;
  categoryId: string;
  rowId: string;
}
