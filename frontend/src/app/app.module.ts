import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './services/api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { EventsService } from './services/events.service';
import { CoreModule } from './core/core.module';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    RoomModule,
    AuthModule,
    CookieModule.forRoot(),
    RouterModule.forRoot([
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [ApiService, AuthGuardService, EventsService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
