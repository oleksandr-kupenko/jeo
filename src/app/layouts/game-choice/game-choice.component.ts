import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-center h-full gap-4">
      <button 
        routerLink="/games/new"
        class="btn btn-primary">
        Create new Game
      </button>

      <button 
        routerLink="/games/sessions"
        class="btn btn-success">
        Continue game
      </button>
      
      <button 
        routerLink="/games/list"
        class="btn btn-success">
        Games list
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
  `]
})
export class GameChoiceComponent {} 