import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {NotificationService} from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const notificationService: NotificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('API Error:', error);

      if (error.status === 401) {
        authService.logout();
        notificationService.showNotification('error', 'Unauthorized access. Please login again.', 5000);
      } else {
        console.log('ERROR')
        const errorMessage = 'An unexpected error occurred';
        notificationService.showNotification('error', errorMessage, 5000);
      }

      return throwError(() => error);
    })
  );
};
