import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-explore-rooms',
  templateUrl: './explore-rooms.component.html',
  styleUrls: ['./explore-rooms.component.scss']
})
export class ExploreRoomsComponent implements OnInit {

  private rooms = [];
  private userId = localStorage.getItem('userId');
  private error = null;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getActiveRooms()
      .then((response: any) => this.rooms = response.data)
      .catch(err => this.error = err.message);
    this.sucscribeToRoomObservable();
  }

  private sucscribeToRoomObservable() {
    const ifRoomExist = (roomId, cb) => {
      const roomIndex = this.getRoomIndex(roomId);
      if (roomIndex !== -1) { cb(roomIndex); }
    };

    // events: self-joined, self-left
    this.roomService.subscribeTo('self-joined')(data => {
      ifRoomExist(data.roomId, index => this.rooms[index].users.push({ userId: this.userId }));
    });
    this.roomService.subscribeTo('self-left')(data => {
      ifRoomExist(data, index => {
        this.rooms[index].users = this.rooms[index].users.filter(user => user.userId !== this.userId);
      });
    });

    // events: deleted
    this.roomService.eventProvider('deleted')
      .subscribe((response: any) => {
        ifRoomExist(response.data, index => this.rooms.splice(index, 1));
      });

    // events: deactivated
    this.roomService.eventProvider('deactivated')
      .subscribe((response: any) => {
        ifRoomExist(response.data, index => this.rooms.splice(index, 1));
      });

    // events: activated
    this.roomService.eventProvider('activated')
      .subscribe((response: any) => {
        this.roomService.getRoomById(response.data)
          .then((response2: any) => this.rooms.push(response2.data))
          .catch(err => this.error = err.message);
      });

    // events: created
    this.roomService.eventProvider('created')
      .subscribe((response: any) => this.rooms.push(response.data));

    // events: room-details-updated
    this.roomService.subscribeTo('room-details-updated')(data => {
      ifRoomExist(data.roomId, index => {
        this.rooms[index].name = data.name;
        this.rooms[index].description = data.description;
      });
    });
  }

  private getRoomIndex(roomId: String) {
    const thisRoom = this.rooms.find(room => room.roomId === roomId);
    return thisRoom ? this.rooms.indexOf(thisRoom) : -1;
  }

  roomClicked(roomId: String) {
    this.roomService.setRoom(roomId);
  }

  joinRoom(roomId: String) {
    this.roomService.joinRoom(roomId)
      .then(() => {
        const room = this.rooms.find(x => x.roomId === roomId);
        this.roomService.eventEmitter('self-joined', room);
      })
      .catch(() => {});
  }

  isMemberOf(room: any) {
    return room && room.users.find(user => user.userId === this.userId) ? true : false;
  }

}
