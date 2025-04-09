import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SubHeaderComponent} from '../sub-header/sub-header.component';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, SubHeaderComponent],
  template: `
    <app-sub-header [backUrl]="'/'"> Создание новой игры </app-sub-header>

    <div class="flex items-center justify-center h-screen gap-4 flex-col">
      <h2 class="text-2xl font-bold mb-6">Выберите способ создания игры</h2>

      <div class="flex gap-4">
        <button
          routerLink="/games/new/manually/new"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Создать вручную
        </button>

        <button
          routerLink="/games/new/automatically"
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Сгенерировать с помощью ИИ
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
