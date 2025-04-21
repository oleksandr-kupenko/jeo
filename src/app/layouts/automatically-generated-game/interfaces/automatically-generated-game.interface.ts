import {Category, Game} from '@core/interfaces/game.interfaces';

export interface AutomaticallyGeneratedGameForm {
  theme: string;
  categories: string[];
  details: string;
  exampleQuestions: string;
  allowImages: boolean;
  allowVideos: boolean;
}

export interface StartAiGenerationResponse {
  generationId: string;
  message: string;
  success: boolean;
}

export type AiGameGenerationStatusResponse =
  | AiGameGenerationPending
  | AiGameGenerationCompleted
  | AiGameGenerationFailed;

export interface AiGameGenerationPending {
  success: true;
  status: 'pending';
  id: 'string';
}

export interface AiGameGenerationCompleted {
  success: true;
  status: 'completed';
  id: 'string';
  data: {categories: Category[]; gameId: Game};
}

export interface AiGameGenerationFailed {
  success: false;
  status: 'failed';
  message: string;
}
