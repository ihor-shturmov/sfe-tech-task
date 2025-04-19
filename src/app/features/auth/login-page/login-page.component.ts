import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import {AuthResponse} from '../../../shared/models/auth';
import {UserStore} from '../../../core/stores/users.store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private userStore = inject(UserStore)
  private router = inject(Router);

  error: WritableSignal<string> = signal('');

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    const username = this.form.get('username')?.value || '';
    const password = this.form.get('password')?.value || '';

    this.login(username, password);

  }

  private handleSuccessRequest(response: AuthResponse): void {
    if (response.token) {
      this.userStore.setToken(response.token);
      this.router.navigate(['/users'])
    }
  }

  private login(username: string, password: string): void {
    this.authService.login(username, password)
      .subscribe({
        next: (response: AuthResponse) => {
          this.handleSuccessRequest(response);
        },

        error: (err) => {
          if (err.status === 401) {
            this.error.set('Invalid username or password');
          }
        }
      })
  }
}
