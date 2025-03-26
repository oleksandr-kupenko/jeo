import {inject, Injectable, resource} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category, Game, Question, QuestionUpdate} from './interfaces/game-board.interfaces';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

const STORAGE_KEYS = {
  CATEGORIES: 'game_categories',
  TEAMS: 'game_teams'
};

@Injectable({providedIn: 'root'})
export class GameBoardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private categories$$ = new BehaviorSubject<Category[]>([]);
  private teams$$ = new BehaviorSubject<[]>([]);

  constructor() {
    this.initializeFromStorage();
  }

  public createGame(title: string): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/games`, {title});
  }

  public getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/games/${id}`);
  }

  private initializeFromStorage(): void {
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const storedTeams = localStorage.getItem(STORAGE_KEYS.TEAMS);

    this.categories$$.next(storedCategories ? JSON.parse(storedCategories) : []);
    this.teams$$.next(storedTeams ? JSON.parse(storedTeams) : []);
  }

  private saveCategoriesToStorage(categories: Category[]): void {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  private saveTeamsToStorage(teams: []): void {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
  }

  getCategories() {
    return this.categories$$.asObservable();
  }

  updateCategoryName(categoryId: string, newName: string): void {
    const updatedCategories = this.categories$$.getValue().map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          name: newName
        };
      }
      return category;
    });

    this.categories$$.next(updatedCategories);
    this.saveCategoriesToStorage(updatedCategories);
  }

  updateQuestion(data: QuestionUpdate): Observable<Question> {
    const postData = {
      question: data.question,
      answer: data.answer,
      categoryId: data.categoryId,
      rowId: data.rowId
    };

    return this.http.patch<Question>(`${this.baseUrl}/api/questions/${data.questionId}`, postData);

    // const updatedCategories = this.categories$$.getValue().map(category => {
    //   if (category.id === categoryId) {
    //     return {
    //       ...category,
    //       questions: category.questions.map(q => {
    //         if (q.id === questionId) {
    //           return {
    //             ...q,
    //             question: question !== null ? question : '',
    //             answer: answer !== null ? answer : ''
    //           };
    //         }
    //         return q;
    //       })
    //     };
    //   }

    //   return category;
    // });

    // this.categories$$.next(updatedCategories);
    // this.saveCategoriesToStorage(updatedCategories);
  }

  getAllGames() {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`);
  }

  deleteGame(gameId: string) {
    return this.http.delete<Game>(`${this.baseUrl}/api/games/${gameId}`);
  }

  // TODO: fix this
  // gamesResource = resource({
  //   loader: async () => {
  //     const response = await fetch(`${this.baseUrl}/api/games`);
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     console.error('Error fetching games', response);
  //     return [];
  //   }
  // });

  // reloadGames() {
  //   this.gamesResource.reload();
  // }

  updateQuestionStatus(categoryId: string, questionId: string) {
    const updatedCategories = this.categories$$.getValue().map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          questions: category.questions.map(q => {
            if (q.id === questionId) {
              return {
                ...q,
                isAnswered: true
              };
            }
            return q;
          })
        };
      }
      return category;
    });

    this.categories$$.next(updatedCategories);
    this.saveCategoriesToStorage(updatedCategories);
  }

  getTeams() {
    return this.teams$$.asObservable();
  }

  updateTeams(teams: []) {
    this.teams$$.next(teams);
    console.log('teams', teams);
    this.saveTeamsToStorage(teams);
  }

  // Дополнительный метод для очистки данных
  resetGame(): void {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TEAMS);
    this.categories$$.next([]);
    this.teams$$.next([]);
  }
}
