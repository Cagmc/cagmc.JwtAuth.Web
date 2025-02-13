import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountService } from '../core/services/account.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading = false;

  constructor(
    private readonly service: AccountService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;

      this.service
        .login(email!, password!)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);

            // Handle successful login
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.log('Login failed', error);
            this.snackBar.open('Login failed. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
        });
    }
  }
}
