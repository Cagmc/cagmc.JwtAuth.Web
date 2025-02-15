import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly platformId;

  constructor(
    // @ts-expect-error-ignore
    @Inject(PLATFORM_ID) platformId,
  ) {
    this.platformId = platformId;
  }

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
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
