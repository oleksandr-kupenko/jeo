import {Question} from '@core/interfaces/game.interfaces';

export interface QuestionUpdatedResponse extends Question {
  category: {
    id: string;
    name: string;
    order: number;
    gameId: string;
  };

  questionRow: {
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
