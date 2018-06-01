import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  private roomId = '';
  private room = null;
  private processing = true;
  private error = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.roomService.joinRoom(this.roomId, false)
      .then((response: any) => {
        this.processing = false;
        this.room = response.data;
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  checkRoom() {
    if (this.room) {
      this.roomService.eventEmitter('selected', this.room);
      this.roomService.currentOpenedRoomId = this.room.roomId;
    } else {
      this.roomService.setRoom(this.roomId);
    }
  }

}
