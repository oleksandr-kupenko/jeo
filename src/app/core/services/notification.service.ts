import {Injectable, NgZone, inject, untracked} from '@angular/core';
import {ExternalToast, Position, toast} from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private activeNotifications: Set<string> = new Set();
  private zone = inject(NgZone);

  constructor() {}

  public showNotification(
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    duration = 10000,
    uniqueKey?: string | null,
    position: Position = 'bottom-right',
    instanceId: string = 'default',
    closeButton = true
  ) {
    if (uniqueKey && this.activeNotifications.has(uniqueKey)) {
      console.log(`[NotificationService] Notification with key ${uniqueKey} already active, skipping`);
      return;
    }

    if (uniqueKey) {
      this.activeNotifications.add(uniqueKey);
      console.log(`[NotificationService] Added notification with key ${uniqueKey} to active set`);
    }

    const options: ExternalToast = {
      duration,
      position,
      onDismiss: () => {
        console.log(`[NotificationService] Notification dismissed: ${message}`);
        if (uniqueKey) {
          this.activeNotifications.delete(uniqueKey);
          console.log(`[NotificationService] Removed notification with key ${uniqueKey} from active set`);
        }
      },
      closeButton,
      // Стили для более заметных уведомлений
      classes: {
        toast: 'font-bold text-lg border-2 p-4 shadow-lg'
      }
    };

    // Запускаем вне Angular зоны для предотвращения проверок изменений
    this.zone.runOutsideAngular(() => {
      if (!toast) {
        console.error('[NotificationService] toast API not available!');
        return;
      }

      switch (type) {
        case 'success':
          toast.success(message, options);
          break;
        case 'error':
          toast.error(message, options);
          break;
        case 'warning':
          toast.warning(message, options);
          break;
        case 'info':
          toast.info(message, options);
          break;
      }
    });
  }
}
