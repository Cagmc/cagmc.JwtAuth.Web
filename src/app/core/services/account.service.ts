import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { AuthenticationMode } from '../enums/authentication-mode.enum';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {}

  public login(
    email: string,
    password: string,
    authenticationMode: AuthenticationMode,
  ): Observable<object> {
    const loginModel = {
      username: email,
      password: password,
      isPersistent: true,
      authenticationMode: authenticationMode,
    } as LoginModel;

    return this.http
      .post(`${this.baseUrl}/api/accounts/login`, loginModel)
      .pipe(
        tap((response) => {
          const loginResponse = response as LoginResponse;
          this.authService.login(loginResponse.token);
        }),
      );
  }

  public me(): Observable<object> {
    return this.http.get(`${this.baseUrl}/api/accounts/me`);
  }
}

export interface LoginModel {
  username: string;
  password: string;
  isPersistent: boolean;
  authenticationMode: AuthenticationMode;
}

export interface LoginResponse {
  token: string;
}

export interface MeViewModel {
  username: string;
  role: string;
}
