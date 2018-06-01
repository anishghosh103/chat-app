import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EventsService } from './events.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private _jwt = new JwtHelperService();

  constructor(
    private _cookieService: CookieService,
    private eventsService: EventsService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthUrl = ['/login', '/signup', '/forgot-password'].includes(state.url)
      || state.url.startsWith('/activate')
      || state.url.startsWith('/reset');
    const isInviteUrl = state.url.startsWith('/invite');

    let authToken: any = this._cookieService.get('authToken');
    if (authToken) {
      authToken = this._jwt.decodeToken(authToken);
    }

    if (authToken) {
      localStorage.setItem('userId', authToken.userId);
      if (isAuthUrl) {
        this._router.navigate(['']);
        return false;
      }
      return true;
    } else {
      if (isAuthUrl) {
        return true;
      }
      if (state.url !== '/') {
        this.eventsService.emit('toast', {
          type: 'error',
          title: 'Authentication Error',
          body: 'You need to login/signup first.'
        });
      }
      this._router.navigate(['login']);
      return false;
    }
  }

}
