import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-center h-screen gap-4">
      <button 
        routerLink="/games/new"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Создать игру
      </button>
      
      <button 
        routerLink="/games/list"
        class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
        Выбрать игру
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `]
})
export class GameChoiceComponent {} 