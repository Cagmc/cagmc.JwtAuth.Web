import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { AuthenticationMode } from '../enums/authentication-mode.enum';
import { AuthService } from '../auth/auth.service';

export interface IAccountService {
  login(
    email: string,
    password: string,
    authenticationMode: AuthenticationMode,
  ): Observable<LoginResponse>;

  me(): Observable<MeViewModel>;
}

@Injectable({ providedIn: 'root' })
export class MockAccountService implements IAccountService {
  constructor(private readonly authService: AuthService) {}

  public login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authenticationMode: AuthenticationMode,
  ): Observable<LoginResponse> {
    const token = 'mock.token';
    this.authService.login(token);

    return new Observable<LoginResponse>((observer) =>
      observer.next({
        token: token,
      } as LoginResponse),
    );
  }

  public me(): Observable<MeViewModel> {
    return new Observable<MeViewModel>((observer) =>
      observer.next({
        username: 'mock.user@cagmc.com',
        role: 'Test',
      } as MeViewModel),
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AccountService implements IAccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {}

  public login(
    email: string,
    password: string,
    authenticationMode: AuthenticationMode,
  ): Observable<LoginResponse> {
    const loginModel = {
      username: email,
      password: password,
      isPersistent: true,
      authenticationMode: authenticationMode,
    } as LoginModel;

    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/accounts/login`, loginModel)
      .pipe(
        tap((response) => {
          this.authService.login(response.token);
        }),
      );
  }

  public me(): Observable<MeViewModel> {
    return this.http.get<MeViewModel>(`${this.baseUrl}/api/accounts/me`);
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
