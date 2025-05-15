import {Game} from './game.interfaces';
import {GameSessionQuestion} from './game-session.interfaces';

export interface Player {
  id: string;
  name: string;
  points: number;
  role: 'GAME_MASTER' | 'CONTESTANT';
  gameSessionId: string;
  userId?: string;
  socketId?: string;
  status: string;
  isGuest: boolean;
}

export interface WebSocketGameSession {
  id: string;
  name: string;
  startedAt: Date;
  endedAt?: Date;
  currentTurn?: string;
  gameId: string;
  numberOfAiPlayers: number;
  numberOfPlayers: number;
  defaultTimer: number;
  inviteCode?: string;
  isPublic: boolean;
  game: Game;
  players: Player[];
  questions: GameSessionQuestion[];
}

export interface ChatMessage {
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Date;
}

export interface QuestionReveal {
  questionId: string;
  playerId: string;
  answer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
}

export interface TimerInfo {
  questionId: string;
  duration: number;
  startTime: Date;
}

export interface GameStartEvent {
  message: string;
  startTime: Date;
  canStart?: boolean;
}

export interface GameEndEvent {
  message: string;
  results: Player[];
  endTime: Date;
}

export interface ScoreUpdateEvent {
  player: Player;
}

export interface QuestionTimeoutEvent {
  questionId: string;
  answer: string;
}

export interface TimerStopEvent {
  questionId: string;
}

export interface AuthSuccessEvent {
  player: Player;
}

export interface ErrorEvent {
  message: string;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
