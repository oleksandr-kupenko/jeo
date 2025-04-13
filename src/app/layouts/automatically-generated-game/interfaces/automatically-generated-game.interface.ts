export interface AutomaticallyGeneratedGameForm {
  theme: string;
  categories: string;
  details: string;
  exampleQuestions: string;
  allowImages: boolean;
  allowVideos: boolean;
}

// export interface GeneratedQuestion {
//   id: string;
//   question: string;
//   answer: string;
//   value: number;
//   categoryId: string;
//   mediaUrl?: string;
//   mediaType?: 'image' | 'video';
// }

// export interface GeneratedCategory {
//   id: string;
//   name: string;
//   questions: GeneratedQuestion[];
// }

// export interface GeneratedGame {
//   id: string;
//   title: string;
//   categories: GeneratedCategory[];
//   createdAt: Date;
//   allowImages: boolean;
//   allowVideos: boolean;
// }
