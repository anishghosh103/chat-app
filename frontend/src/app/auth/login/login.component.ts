import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user = {
    username: '',
    password: ''
  };

  private errors = {
    username: '',
    password: '',
    error: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.user);
    if (!this.user.username || !this.user.password) {
      if (!this.user.username) { this.errors.username = 'Enter your username.'; }
      if (!this.user.password) { this.errors.password = 'Enter your password.'; }
      return;
    }
    this.authService.login(this.user)
      .then(() => this.router.navigate(['']))
      .catch(err => {
        // console.log(err);
        this.errors.username = err.username || '';
        this.errors.password = err.password || '';
        this.errors.error = 'Something Went Wrong! Please Try Again.';
      });
  }

}
