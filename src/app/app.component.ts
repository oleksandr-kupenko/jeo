import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {toast} from 'ngx-sonner';
import {HlmToasterComponent} from '../../libs/ui/ui-sonner-helm/src/lib/hlm-toaster.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NotificationService} from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, HlmToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jeopardy';
  isSidebarOpen = signal(false);
  private notificationService = inject(NotificationService);

  constructor() {
    // Отключаем автоматические проверки, оставляем только ручную
  }

  public testNotification(): void {
    console.log('Showing test notification');
    toast('Hello World', {
      unstyled: true,
      classes: {
        toast: 'bg-blue-400',
        title: 'text-red-400 text-2xl',
        description: 'text-red-400',
        actionButton: 'bg-zinc-400',
        cancelButton: 'bg-orange-400',
        closeButton: 'bg-lime-400'
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((v: boolean) => !v);
  }

  closeSidebar(): void {
    console.log('closeSidebar 1111');
    this.isSidebarOpen.set(false);
  }
}
