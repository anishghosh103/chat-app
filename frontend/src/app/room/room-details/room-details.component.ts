import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('nameInputBox') private nameInputBox: ElementRef;
  @ViewChild('descriptionInputBox') private descriptionInputBox: ElementRef;

  private userId = localStorage.getItem('userId');
  private room = null;
  private temp = { roomId: '', name: '', description: '' };
  private showingNameInput = false;
  private showingDescriptionInput = false;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.eventProvider('show-room-details')
      .subscribe((response: any) => {
        this.room = response.data;
        this.temp.roomId = this.room.roomId;
        this.temp.name = this.room.name;
        this.temp.description = this.room.description;
      });
  }

  ngAfterViewChecked(): void {
    if (this.showingNameInput && this.nameInputBox) {
      this.nameInputBox.nativeElement.focus();
    }
    if (this.showDescriptionInput && this.descriptionInputBox) {
      this.descriptionInputBox.nativeElement.focus();
    }
  }

  private close() {
    this.room = null;
  }

  private showNameInput() {
    if (this.showDescriptionInput) {
      this.updateRoomDetails(() => {
        this.showingDescriptionInput = false;
        this.showingNameInput = true;
      });
    } else {
      this.showingNameInput = true;
    }
  }

  private nameInput(e) {
    if (e.keyCode === 13) {
      this.updateRoomDetails(() => this.showingNameInput = false);
    }
  }

  private showDescriptionInput() {
    if (this.showingNameInput) {
      this.updateRoomDetails(() => {
        this.showingNameInput = false;
        this.showingDescriptionInput = true;
      });
    } else {
      this.showingDescriptionInput = true;
    }
  }

  private descriptionInput(e) {
    if (e.keyCode === 13) {
      this.updateRoomDetails(() => this.showingDescriptionInput = false);
    }
  }

  private updateRoomDetails(callback) {
    this.roomService.updateRoomDetails(this.room.roomId, this.temp)
    .then(() => {
      callback();
      this.room.name = this.temp.name;
      this.room.description = this.temp.description;
      this.roomService.eventEmitter('room-details-updated', this.temp);
    })
    .catch();
  }

}
