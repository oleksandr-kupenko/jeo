import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { GameSession, NewGameSessionParams } from './interfaces/gama-session.interface';
import { Question } from '../game-board/interfaces/game-board.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    readonly currentGameSession = signal<GameSession | null>(null);

    constructor() {}

    createGameSession(gameSessionParams: NewGameSessionParams): Observable<GameSession> {
        return this.http.post<GameSession>(`${this.baseUrl}/api/game-sessions`, gameSessionParams).pipe(
            tap((gameSession) => {
                this.currentGameSession.set(gameSession);
            })
        );
    }

    getGameSession(gameSessionId: string): Observable<GameSession> {
        return this.http.get<GameSession>(`${this.baseUrl}/api/game-sessions/${gameSessionId}`);
    }

    updateQuestionStatus(questionId: string): Observable<Question> {
      return this.http.patch<Question>(`${this.baseUrl}/api/questions/${questionId}/answered`, {});
    }
}