import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { EventsService } from '../services/events.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  private promise(cb) {
    const obj = {};
    return new Promise((resolve, reject) => {
      cb({
        set: (key, value = null) => obj[key] = value,
        success: () => resolve(obj),
        err: () => reject(obj)
      });
    });
  }

  activateAccount(token: string) {
    return this.promise(cb => {
      this.apiService.activateAccount(token)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.set('error', response.message);
              cb.err();
            }
          },
          err => {
            this.toastService.error('Error Occurred');
            cb.err();
          }
        );
    });
  }

  forgotPassword(username: string) {
    return this.promise(cb => {
      if (!username) {
        cb.set('username', 'Enter your username.');
        cb.err();
      }
      this.apiService.forgotPassword(username)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else if (response.status === 404) {
              cb.set('username', response.message);
              cb.err();
            } else {
              this.toastService.error(response.message);
              cb.err();
            }
          },
          err => {
            this.toastService.error('Error Occurred.');
            cb.err();
          }
        );
    });
  }

  login(user: any) {
    return this.promise(cb => {
      this.apiService.login(user)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else if (response.status === 404 || response.status === 409) {
              cb.set('username', response.message);
              cb.err();
            } else if (response.status === 422) {
              cb.set('password', response.message);
              cb.err();
            } else {
              this.toastService.error(response.message);
              cb.err();
            }
          },
          err => cb.err()
        );
    });
  }

  resetPassword(userId: string, password: string) {
    return this.promise(cb => {
      this.apiService.resetPassword(userId, password)
        .subscribe(
          (response: any) => {
            // console.log(response);
            if (response.status === 200) {
              cb.success();
            } else if (response.status === 404) {
              cb.set('userId', response.message);
              cb.err();
            } else {
              this.toastService.error(response.message);
              cb.err();
            }
          },
          err => {
            this.toastService.error('Error occurred.');
            cb.err();
          }
        );
    });
  }

  signup(user: any) {
    return this.promise(cb => {
      this.apiService.signup(user)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else if (response.status === 409) {
              const msgInLower = response.message.toLowerCase();
              if (msgInLower.includes('email')) {
                cb.set('email', response.message);
                cb.err();
              } else if (msgInLower.includes('username')) {
                cb.set('username', response.message);
                cb.err();
              }
            } else {
              this.toastService.error('Something went wrong!', 'Please try again.');
              cb.err();
            }
          },
          err => {
            this.toastService.error('Something went wrong!', 'Please try again.');
            cb.err();
          }
        );
    });
  }

}
