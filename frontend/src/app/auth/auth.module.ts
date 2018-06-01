import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetComponent } from './reset/reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RootComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent },
          { path: 'activate/:token', component: ActivateComponent },
          { path: 'reset/:token', component: ResetComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent }
        ]
      }
    ])
  ],
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    ActivateComponent,
    ResetComponent,
    ForgotPasswordComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
