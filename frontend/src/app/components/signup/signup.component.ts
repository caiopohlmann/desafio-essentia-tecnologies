import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp(): void {
    console.log('Sending user data:', this.user);
    
    this.userService.signUp(this.user).subscribe(
      res => {
        console.log('User registered successfully:', res);
        this.router.navigate(['/listas']);
      },
      err => {
        console.error('Error registering user:', err);
      }
    );
  }
}
