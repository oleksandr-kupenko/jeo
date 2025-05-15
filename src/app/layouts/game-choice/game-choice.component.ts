import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {HlmIconDirective} from '@libs/ui-icon-helm/src';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  imports: [RouterLink, NgIcon, HlmIconDirective],
  template: `
    <div class="flex flex-col md:flex-row items-center justify-center h-full gap-6 w-full max-w-4xl mx-auto p-4">
      <!-- Create New Game Card -->
      <button
        routerLink="/games/new"
        class="flex-1 w-full h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-white transition-all duration-300 hover:shadow-blue-400/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
      >
        <div class="flex items-center justify-center bg-blue-400/30 p-4 rounded-full">
          <!-- Plus Circle Icon (SVG) -->
          <ng-icon hlm size="xl" name="lucidePlus" />
        </div>
        <h2 class="text-2xl font-bold text-center">Create new Game</h2>
        <p class="text-blue-100 text-center text-sm">Start a fresh Jeopardy game with new categories and questions</p>
      </button>

      <!-- Continue Game Card -->
      <button
        routerLink="/games/sessions"
        class="flex-1 w-full h-64 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-white transition-all duration-300 hover:shadow-green-400/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
      >
        <div class="flex items-center justify-center bg-green-400/30 p-4 rounded-full">
          <!-- Play Icon (SVG) -->
          <ng-icon hlm size="xl" name="lucidePlay" />
        </div>
        <h2 class="text-2xl font-bold text-center">Continue game</h2>
        <p class="text-green-100 text-center text-sm">Resume your previous Jeopardy session where you left off</p>
      </button>

      <!-- Games List Card -->
      <button
        routerLink="/games/list"
        class="flex-1 w-full h-64 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-white transition-all duration-300 hover:shadow-emerald-400/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
      >
        <div class="flex items-center justify-center bg-emerald-400/30 p-4 rounded-full">
          <!-- List Icon (SVG) -->
          <ng-icon hlm size="xl" name="lucideList" />
        </div>
        <h2 class="text-2xl font-bold text-center">Games list</h2>
        <p class="text-emerald-100 text-center text-sm">Browse and select from your saved Jeopardy games</p>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class GameChoiceComponent {}
