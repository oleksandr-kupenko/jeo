import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SubHeaderComponent} from '../sub-header/sub-header.component';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, SubHeaderComponent],
  template: `
    <app-sub-header [backUrl]="'/'">Create New Game</app-sub-header>

    <div class="flex items-center justify-center h-screen gap-6 flex-col p-4">
      <h2 class="text-2xl font-bold mb-6">Choose Game Creation Method</h2>

      <div class="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <!-- Create Manually Card -->
        <button
          routerLink="/games/new/manually/new"
          class="flex-1 w-full h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-white transition-all duration-300 hover:shadow-blue-400/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
        >
          <div class="bg-blue-400/30 p-4 rounded-full">
            <!-- Edit/Pencil Icon (SVG) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-center">Create Manually</h2>
          <p class="text-blue-100 text-center text-sm">Create your own categories and questions from scratch</p>
        </button>

        <!-- Generate with AI Card -->
        <button
          routerLink="/games/new/automatically"
          class="flex-1 w-full h-64 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-white transition-all duration-300 hover:shadow-green-400/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
        >
          <div class="flex items-center justify-center bg-green-400/30 p-4 rounded-full">
            <!-- AI/Sparkles Icon (SVG) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M12 3v4"></path>
              <path d="m18 9-2.201 5.032"></path>
              <path d="M6 9s2.304 5.032 3 6.532"></path>
              <path d="M3 21h18"></path>
              <path d="M10 21v-4.472a2 2 0 0 1 4 0V21"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-center">Generate with AI</h2>
          <p class="text-green-100 text-center text-sm">Let AI create categories and questions for your game</p>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
      }
    `
  ]
})
export class NewGameComponent {}
