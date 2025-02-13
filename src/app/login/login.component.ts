import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel,MatError} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AccountService} from '../core/services/account.service';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private readonly service: AccountService) {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.service.login(email!, password!);

      window.location.href = '/home';
    }
  }
}
