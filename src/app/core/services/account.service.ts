import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, switchMap, timer } from 'rxjs';
import { AuthenticationMode } from '../enums/authentication-mode.enum';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): Observable<object> {
    const loginModel = {
      username: email,
      password: password,
      isPersistent: true,
      authenticationMode: AuthenticationMode.Cookie,
    };

    return timer(2000).pipe(
      switchMap(() =>
        this.http.post(`${this.baseUrl}/api/accounts/login`, loginModel),
      ),
    );
  }
}
