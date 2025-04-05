import { Game, Question } from "../../game-board/interfaces/game-board.interfaces";

export interface GameSession {
    id: string;
    name: string;
    defaultTimer: number;
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


export interface NewGameSessionParams {
    gameId: string;
    numberOfPlayers: number;
    numberOfAiPlayers: number;
    defaultTimer: number;
    name: string;
}