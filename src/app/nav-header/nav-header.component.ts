import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  AccountService,
  MockAccountService,
} from '../core/services/account.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nav-header',
  providers: [
    {
      provide: AccountService,
      useClass: environment.useMockApi ? MockAccountService : AccountService,
    },
  ],
  imports: [MatAnchor, RouterLink],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
})
export class NavHeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
