import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './layouts/game-board/game-board.component';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'jeopardy';
  isSidebarOpen = signal(false);
  
  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }
  
  closeSidebar(): void {
    console.log('closeSidebar 1111');
    this.isSidebarOpen.set(false);
  }
}
