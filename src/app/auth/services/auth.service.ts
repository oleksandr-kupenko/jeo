import {Injectable, signal, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {tap, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthApiService} from './auth-api.service';
import {AuthResponse} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jeopardy_token';
  private readonly USER_KEY = 'jeopardy_user';

  private currentUserSignal = signal<any>(this.getStoredUser());
  public isAuthenticated = computed(() => !!this.currentUserSignal());
  
  public currentUser = computed(() => this.currentUserSignal());

  private router = inject(Router);
  private api = inject(AuthApiService);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.api.login({email, password}).pipe(
      tap(response => {
        this.setSession(response);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  register(email: string, name: string, password: string): Observable<AuthResponse> {
    return this.api.register({email, name, password}).pipe(
      tap(response => {
        this.setSession(response);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    this.currentUserSignal.set(authResult.user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  private getStoredUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
