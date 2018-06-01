import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private user = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  private errors = {
    name: '',
    email: '',
    username: '',
    password: '',
    misc: ''
  };

  private signedUp = false;
  private processing = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signup() {
    this.processing = true;
    let error = false;
    // validate name
    if (!this.user.name) {
      error = true;
      this.errors.name = 'Enter your name.';
    }
    // validate email
    const emailRegex = new RegExp('^\\w+([\\.]\\w+)*@[a-zA-Z_]+\\.[a-zA-Z]{2,3}$');
    if (!this.user.email) {
      error = true;
      this.errors.email = 'Enter your email.';
    } else if (emailRegex.test(this.user.email) === false) {
      error = true;
      this.errors.email = 'Invalid email provided.';
    }
    // validate username
    const usernameRegex = new RegExp('^[a-zA-Z0-9\.]{8,}$');
    if (!this.user.username) {
      error = true;
      this.errors.username = 'Enter a username.';
    } else if (this.user.username.length < 8) {
      error = true;
      this.errors.username = 'Username should contain at least 8 characters.';
    } else if (usernameRegex.test(this.user.username) === false) {
      error = true;
      this.errors.username = 'Use only letters, numbers, and dot.';
    }
    // validate password
    if (!this.user.password) {
      error = true;
      this.errors.password = 'Enter a password.';
    } else if (this.user.password.length < 8) {
      error = true;
      this.errors.password = 'Password should contain at least 8 characters.';
    }
    if (error) {
      this.processing = false;
      return;
    }
    this.authService.signup(this.user)
      .then(() => {
        this.signedUp = true;
      })
      .catch(err => {
        this.errors.name = err.name || '';
        this.errors.email = err.email || '';
        this.errors.username = err.username || '';
        this.errors.password = err.password || '';
        this.processing = false;
      });
  }

}
