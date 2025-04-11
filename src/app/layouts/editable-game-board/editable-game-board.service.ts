import {inject, Injectable, resource} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  Category,
  Game,
  Question,
  QuestionUpdate,
  QuestionUpdatedResponse
} from '../game-board/interfaces/game-board.interfaces';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

const STORAGE_KEYS = {
  CATEGORIES: 'game_categories',
  TEAMS: 'game_teams'
};

@Injectable({providedIn: 'root'})
export class EditableGameBoardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() {}

  public createGame(title: string): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/games`, {title});
  }

  public getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/games/${id}`);
  }

  public updateGameTitle(gameId: string, title: string): Observable<Game> {
    return this.http.patch<Game>(`${this.baseUrl}/api/games/${gameId}`, {title});
  }

  updateCategoryName(categoryId: string, data: {name?: string; order?: number}): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/api/categories/${categoryId}`, data);
  }

  updateQuestion(data: QuestionUpdate): Observable<QuestionUpdatedResponse> {
    const postData = {
      question: data.question,
      answer: data.answer,
      categoryId: data.categoryId,
      rowId: data.rowId
    };

    return this.http.patch<QuestionUpdatedResponse>(`${this.baseUrl}/api/questions/${data.questionId}`, postData);
  }

  updateRowQuestionPoints(rowId: string, newValue: number): Observable<Question> {
    return this.http.patch<Question>(`${this.baseUrl}/api/questions/rows/${rowId}`, {value: newValue});
  }

  getAllGames() {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`);
  }

  deleteGame(gameId: string) {
    return this.http.delete<Game>(`${this.baseUrl}/api/games/${gameId}`);
  }
}
