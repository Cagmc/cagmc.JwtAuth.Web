import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailInput = new FormControl('');
  passwordInput = new FormControl('');

  onLogin() {
    console.log('login');

    // Redirect to home page
    window.location.href = '/home';
  }
}
