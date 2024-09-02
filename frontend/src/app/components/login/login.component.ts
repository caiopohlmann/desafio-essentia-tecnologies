import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginUser } from '../../interfaces/Login-user';
import { LoginResponse } from '../../interfaces/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: LoginUser = {
    email: '',
    password: ''
  };
  public errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {
    this.userService.login(this.user).subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/listas']);
      },
      error => {
        console.error('Erro durante o login:', error);
        this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    );
  }
}
