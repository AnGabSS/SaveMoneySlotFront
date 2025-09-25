import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthResponse } from '../model/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredential) {
    return this.http.post<AuthResponse>(this.apiUrl, credentials).pipe(
      tap((response) => {
        sessionStorage.setItem('authToken', response.token);
        console.log(new Date().toLocaleDateString());
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
