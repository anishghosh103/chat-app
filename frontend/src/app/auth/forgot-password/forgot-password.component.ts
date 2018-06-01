import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private username = '';

  private error = { username: '' };

  private submitted = false;
  private processing = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  forgotPassword() {
    this.processing = true;
    this.authService.forgotPassword(this.username)
      .then(() => this.submitted = true)
      .catch(err => {
        this.error.username = err.username || '';
        this.processing = false;
      });
  }

}
