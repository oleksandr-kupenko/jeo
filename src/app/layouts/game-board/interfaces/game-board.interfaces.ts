export interface Category {
  name: string;
  questions: Question[];
  id: string;
}

export interface Question {
  value: number;
  question: string;
  answer: string;
  isAnswered: boolean;
  id: string;
}

export interface Team {
  name: string;
  points: number;
  id: string;
}
