import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  ForgotPasswordApiResponse,
  ForgotPasswordRequestBody,
  LoginApiResponse,
  LoginRequestBody,
  RegisterApiResponse,
  RegisterRequestBody,
} from '../models/auth.model';
import { Observable, catchError, of } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  loggedIn = signal(false);
  isAdministrator = signal(false);

  notifications = inject(NotificationsService);

  login(username: string, password: string): Observable<LoginApiResponse> {
    const apiUrl = this.baseUrl + '/api/users/login';
    const body: LoginRequestBody = { username: username, password };
    return this.http.post<LoginApiResponse>(apiUrl, body).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: LoginApiResponse = {
          success: false,
          data: { expirationDate: '', token: '' },
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  logout() {
    localStorage.clear();
    this.loggedIn.set(false);
    this.isAdministrator.set(false);
    this.notifications.success('Logout exitoso', 'Hasta luego');
  }

  verifyLocalStorage() {
    const token = localStorage.getItem('token');
    this.loggedIn.set(token ? true : false);

    const isAdministrator = localStorage.getItem('isAdministrator');
    this.isAdministrator.set(isAdministrator === 'true');
  }
 
}
