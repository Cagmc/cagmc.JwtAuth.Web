import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    if (localStorage === undefined) {
      return false;
    }

    return localStorage.getItem(this.tokenKey) !== null;
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) as string;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
