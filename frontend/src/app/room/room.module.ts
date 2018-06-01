import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { RoomListComponent } from './room-list/room-list.component';
import { ExploreRoomsComponent } from './explore-rooms/explore-rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { RoomService } from './room.service';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { MomentModule } from 'ngx-moment';
import { InviteComponent } from './invite/invite.component';
import { SortByLastUpdatedPipe } from './pipes/sort-by-last-updated.pipe';
import { RoomDetailsComponent } from './room-details/room-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    RouterModule.forChild([
      {
        path: '',
        component: RootComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: '', component: RoomListComponent },
          { path: 'explore', component: ExploreRoomsComponent },
          { path: 'create-room', component: CreateRoomComponent },
          { path: 'invite/:roomId', component: InviteComponent }
        ]
      }
    ])
  ],
  declarations: [
    RootComponent,
    InviteComponent,
    RoomListComponent,
    ExploreRoomsComponent,
    CreateRoomComponent,
    ChatAreaComponent,
    SortByLastUpdatedPipe,
    RoomDetailsComponent
  ],
  providers: [RoomService]
})
export class RoomModule { }
