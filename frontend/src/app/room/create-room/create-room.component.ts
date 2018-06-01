import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  private room = {
    name: '',
    description: ''
  };

  private error = {
    name: '',
    misc: ''
  };

  private roomCreated = false;

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  createRoom() {
    this.roomService.createRoom(this.room)
      .then(() => {
        this.roomCreated = true;
        this.room.name = '';
        this.room.description = '';
      })
      .catch(err => this.error.name = err.name || '');
  }

  createAnotherRoom() {
    this.room.name = '';
    this.room.description = '';
    this.roomCreated = false;
  }

}
