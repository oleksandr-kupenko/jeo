import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity"
      [class.hidden]="!isOpen()"
      (click)="handleCloseSidebar()"
    ></div>
    
    <aside 
      class="fixed top-0 left-0 h-full w-64 bg-blue-800 text-white z-30 transform transition-transform duration-300 ease-in-out"
      [class.translate-x-0]="isOpen()"
      [class.-translate-x-full]="!isOpen()"
    >
      <div class="p-4 border-b border-blue-700">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Меню</h2>
          <button 
            class="focus:outline-none" 
            (click)="handleCloseSidebar()"
            aria-label="Закрыть меню"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <a 
              routerLink="/" 
              class="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              (click)="handleCloseSidebar()"
            >
              Главная
            </a>
          </li>
          <li>
            <a 
              routerLink="/games/list" 
              class="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              (click)="handleCloseSidebar()"
            >
              Мои игры
            </a>
          </li>
          <li>
            <a 
              routerLink="/games/new" 
              class="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              (click)="handleCloseSidebar()"
            >
              Создать игру
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class SidebarComponent {
  isOpen = input<boolean>(false);
  onCloseSidebar = output<void>();
  
  public handleCloseSidebar(): void {
    console.log('EMIT');
    this.onCloseSidebar.emit();
  }
} 