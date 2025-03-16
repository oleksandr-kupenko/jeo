export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: string;
  category: string;
  points: number;
  question: string;
  answer: string;
  isAnswered: boolean;
}

export interface GameState {
  players: Player[];
  questions: Question[];
  hostId: string | null;
  currentPlayerId: string | null;
  selectedQuestionId: string | null;
} 