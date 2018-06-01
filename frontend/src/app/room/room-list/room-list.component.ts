import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  private rooms = [];
  private pipeTrigger = 0;
  private error = null;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRoomsOfCurrentUser()
      .then((data: any) => this.rooms = data.rooms)
      .catch(err => this.error = err.message);
    this.subcribeToRoomObservable();
  }

  private subcribeToRoomObservable() {
    const ifRoomExist = (roomId, cb) => {
      const roomIndex = this.getRoomIndex(roomId);
      if (roomIndex !== -1) { cb(roomIndex); }
    };
    this.roomService.eventProvider('activated', 'deactivated')
      .subscribe((response: any) => {
        const data = response.data;
        const event = response.event;
        ifRoomExist(data, index => {
          this.rooms[index].active = event === 'activated';
          this.updateRoom(index);
          if (this.roomService.currentOpenedRoomId !== data) {
            this.rooms[index].notification += 1;
          }
        });
      });
    this.roomService.eventProvider('deleted')
      .subscribe((response: any) => {
        ifRoomExist(response.data, index => this.rooms.splice(index, 1));
      });
    this.roomService.eventProvider('selected')
      .subscribe((response: any) => {
        ifRoomExist(response.data.roomId, index => this.rooms[index].notification = 0);
      });

    this.roomService.eventProvider('self-joined')
      .subscribe((response: any) => this.rooms.push(response.data));
    this.roomService.eventProvider('self-left')
      .subscribe((response: any) => ifRoomExist(response.data, index => this.rooms.splice(index, 1)));

    this.roomService.eventProvider('user-left', 'user-joined')
      .subscribe((response: any) => {
        ifRoomExist(response.data.roomId, index => {
          this.updateRoom(index);
          if (this.roomService.currentOpenedRoomId !== response.data.roomId) {
            this.rooms[index].notification += 1;
          }
        });
      });

    this.roomService.eventProvider('update')
      .subscribe((response: any) => {
        ifRoomExist(response.data.roomId, index => {
          const room = this.rooms[index];
          if (this.roomService.currentOpenedRoomId !== response.data.roomId) {
            if (room.notification === undefined) {
              room.notification = 1;
            } else {
              room.notification += 1;
            }
          }
          room.lastUpdated = Date.now();
          this.pipeTrigger = this.pipeTrigger + 1;
        });
      });

    this.roomService.subscribeTo('room-details-updated')(data => {
      ifRoomExist(data.roomId, index => {
        this.rooms[index].name = data.name;
        this.rooms[index].description = data.description;
      });
    });
  }

  private updateRoom(index: any) {
    this.rooms[index].lastUpdated = Date.now();
    this.pipeTrigger++;
  }

  private getRoomIndex(roomId: String) {
    const thisRoom = this.rooms && this.rooms.find(room => room.roomId === roomId);
    return thisRoom ? this.rooms.indexOf(thisRoom) : -1;
  }

  roomClicked(roomId: String) {
    this.roomService.setRoom(roomId);
  }

}
