import { Component, OnInit } from '@angular/core';
import { AccountService, MeViewModel } from '../core/services/account.service';

@Component({
  selector: 'app-profile',
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
        this.meViewModel = response as MeViewModel;
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      },
    });
  }
}
