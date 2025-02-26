import { Component, OnInit } from '@angular/core';
import {
  AccountService,
  MeViewModel,
  MockAccountService,
} from '../core/services/account.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  providers: [
    {
      provide: AccountService,
      useClass: environment.useMockApi ? MockAccountService : AccountService,
    },
  ],
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  meViewModel: MeViewModel | undefined;

  constructor(private readonly service: AccountService) {}

  ngOnInit(): void {
    this.service.me().subscribe({
      next: (response) => {
        this.meViewModel = response;
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      },
    });
  }
}
