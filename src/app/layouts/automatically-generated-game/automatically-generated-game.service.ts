import {inject, Injectable} from '@angular/core';
import {
  AiGameGenerationStatusResponse,
  AiGameGenerationFailed,
  AutomaticallyGeneratedGameForm,
  StartAiGenerationResponse
} from './interfaces/automatically-generated-game.interface';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, interval, switchMap, takeWhile, catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomaticallyGeneratedGameService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() {}

  public generateGame(formValue: AutomaticallyGeneratedGameForm): Observable<StartAiGenerationResponse> {
    return this.http.post<StartAiGenerationResponse>(`${this.baseUrl}/api/ai-games/generate`, formValue);
  }

  public checkGenerationStatus(generationId: string): Observable<AiGameGenerationStatusResponse> {
    return this.http.get<AiGameGenerationStatusResponse>(`${this.baseUrl}/api/ai-games/status/${generationId}`);
  }

  public pollGenerationStatus(generationId: string): Observable<AiGameGenerationStatusResponse> {
    return interval(1000).pipe(
      switchMap(() => this.checkGenerationStatus(generationId)),
      takeWhile(response => response.status === 'pending', true),
      catchError(error => {
        console.error('Error polling game generation status:', error);
        return of({
          success: false,
          status: 'failed',
          message: 'Failed to check generation status'
        } as AiGameGenerationFailed);
      })
    );
  }
}
