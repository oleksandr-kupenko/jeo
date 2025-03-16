import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { questionsMock } from './mock/questions.mock';
import { Category, Team } from './interfaces/game-board.interfaces';
import { teamsMock } from './mock/teams.mock';

const STORAGE_KEYS = {
  CATEGORIES: 'game_categories',
  TEAMS: 'game_teams'
};

@Injectable({ providedIn: 'root' })
export class GameBoardService {
  private categories$$ = new BehaviorSubject<Category[]>([]);
  private teams$$ = new BehaviorSubject<Team[]>([]);

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const storedTeams = localStorage.getItem(STORAGE_KEYS.TEAMS);

    this.categories$$.next(storedCategories ? JSON.parse(storedCategories) : questionsMock);
    this.teams$$.next(storedTeams ? JSON.parse(storedTeams) : teamsMock);
  }

  private saveCategoriesToStorage(categories: Category[]): void {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  private saveTeamsToStorage(teams: Team[]): void {
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

  updateQuestion(categoryId: string, questionId: string, question: string | null, answer: string | null) {
    const updatedCategories = this.categories$$.getValue().map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          questions: category.questions.map(q => {
            if (q.id === questionId) {
              return {
                ...q,
                ...(question && { question }),
                ...(answer && { answer })
              };
            }
            return q;
          })
        };
      }

      return category;
    });
    console.log('111', updatedCategories);
    this.categories$$.next(updatedCategories);
    this.saveCategoriesToStorage(updatedCategories);
  }

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

  updateTeams(teams: Team[]) {
    this.teams$$.next(teams);
    console.log('teams', teams);
    this.saveTeamsToStorage(teams);
  }

  // Дополнительный метод для очистки данных
  resetGame(): void {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TEAMS);
    this.categories$$.next(questionsMock);
    this.teams$$.next(teamsMock);
  }
}
