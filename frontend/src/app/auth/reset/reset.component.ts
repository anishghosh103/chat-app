import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  private jwt = new JwtHelperService();

  private user = {
    userId: '',
    password: ''
  };

  private error = { password: '' };
  private submitted = false;
  private processing = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    const decodedToken = this.jwt.decodeToken(token);
    if (decodedToken && decodedToken.type === 'password-reset' && decodedToken.data) {
      this.user.userId = decodedToken.data;
    }
  }

  resetPassword() {
    if (!this.user.password) {
      this.error.password = 'Enter a password.';
    }
    if (this.user.password.length < 8) {
      this.error.password = 'Password should contain at least 8 characters.';
    }
    this.processing = true;
    this.authService.resetPassword(this.user.userId, this.user.password)
      .then(() => this.submitted = true)
      .catch((err: any) => {
        this.error.password = err.password || '';
        this.processing = false;
      });
  }

}
