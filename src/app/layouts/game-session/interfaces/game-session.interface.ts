export interface NewGameSessionParams {
  gameId: string;
  numberOfPlayers: number;
  numberOfAiPlayers: number;
  defaultTimer: number;
  name: string;
}
