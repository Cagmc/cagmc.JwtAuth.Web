import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const loginModel = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.baseUrl}/api/accounts/login`, loginModel);
  }
}
