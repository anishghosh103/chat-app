import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { FormsModule } from '@angular/forms';
import { InviteModalComponent } from './invite-modal/invite-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ToastComponent, InviteModalComponent],
  exports: [ToastComponent, InviteModalComponent]
})
export class CoreModule { }
