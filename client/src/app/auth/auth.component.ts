import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public isLogin: boolean = true;
  public username: string = '';
  public password: string = '';
  public loading: boolean = false;

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) { }

  submit() {
    if (this.isLogin) this.login();
    else this.signup();
  }

  login() {
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        error: error => {
          if (error?.error?.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentication Failed',
              detail: error.error.message,
            });
          }
        }
      })
  }

  signup() {
    this.auth.signup({ username: this.username, password: this.password })
      .subscribe({
        error: error => {
          if (error?.error?.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentication Failed',
              detail: error.error.message,
            });
          }
        }
      })
  }

  get actionText(): string {
    return this.isLogin ? 'Login' : 'Sign up';
  }
}
