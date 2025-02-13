import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): boolean {
    const loginModel = {
      email: email,
      password: password,
    };

    this.http
      .post(`${this.baseUrl}/api/accounts/login`, loginModel)
      .subscribe();

    return true;
  }
}
