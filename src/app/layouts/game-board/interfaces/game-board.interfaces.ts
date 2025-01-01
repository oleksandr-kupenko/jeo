export interface Category {
  name: string;
  questions: Question[];
}

export interface Question {
  value: number;
  question: string;
  answer: string;
  isAnswered: boolean;
}
