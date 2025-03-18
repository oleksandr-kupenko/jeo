import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { HlmTooltipComponent, HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { AuthService } from '../../auth/services/auth.service';
import { BackdropDirective } from '../../core/directives/backdrop.directive';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    BackdropDirective,
    NgIcon
  ],
  providers: [
    provideIcons({ lucideLogOut })
  ],
  template: `
        <header class="bg-blue-900 text-white shadow-md">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <div class="flex items-center">
          <button 
            class="mr-4 focus:outline-none" 
            (click)="handleToggleSidebar()"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a routerLink="/" class="text-xl font-bold flex items-center">
            <span class="text-yellow-400">J</span>eopardy
          </a>
        </div>
        
        <div class="flex items-center">
          @if(authService.isAuthenticated()) {
            <div class="relative">
              <button 
                class="flex items-center focus:outline-none"
                (click)="toggleUserMenu()"
              >
                <span class="mr-2">{{ userName() }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </button>
              @if(isUserMenuOpen()) { 
                <div 
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  (clickOutside)="toggleUserMenu()">
                  <a 
                    href="#" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    (click)="logout($event)"
                  >
                    <div class="flex items-center">
                      <ng-icon name="lucideLogOut" class="mr-2"></ng-icon>
                      Logout
                    </div>
                  </a>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  isUserMenuOpen = signal(false);
  toggleSidebar = output<void>();
  
  userName = computed(() => {
    const user = this.authService.currentUser();
    return user ? user.name : '';
  });
  
  toggleUserMenu(): void {
    this.isUserMenuOpen.update(value => !value);
  }
  
  logout(event: Event): void {  
    event.preventDefault();
    this.authService.logout();
    this.isUserMenuOpen.set(false);
  }
  
  public handleToggleSidebar(): void {
    console.log('handleToggleSidebar');
    this.toggleSidebar.emit();
  }
}