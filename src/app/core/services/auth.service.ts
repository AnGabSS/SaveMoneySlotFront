import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthResponse } from '../model/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users/login`;
  private _isLoggedIn = signal<boolean>(!!this.getToken());

  public isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredential) {
    return this.http.post<AuthResponse>(this.apiUrl, credentials).pipe(
      tap((response) => {
        sessionStorage.setItem('authToken', response.token);
        this._isLoggedIn.set(true);
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this._isLoggedIn.set(false);
    console.log('You are being logged out... See you later :))');
  }
}
