import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, LoginRequest, RegisterRequest} from '../interfaces/auth.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/users/login`, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/users/register`, data);
  }
}
