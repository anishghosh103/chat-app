import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { RoomService } from '../room.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer: ElementRef;

  private room: any = null;
  private optionsVisible = false;
  private userId = localStorage.getItem('userId');
  private isMember = null;
  private message = '';
  private updates = [];
  private scrollToBottom = false;

  private userTypingTimer = null;
  private userTyping = '';

  private page = 1;
  private limit = 20;
  private totalUpdates = 0;
  private updateLastViewedCount = 3;

  private messageContainerLastHeight = 0;
  private loadingMoreMessages = false;

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.subscribeToRoomObservable();
    this.subscribeToClickEvents();
  }

  ngAfterViewChecked(): void {
    if (this.scrollToBottom) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight - this.messageContainerLastHeight;
      this.messageContainerLastHeight = 0;
      this.scrollToBottom = false;
    }
  }

  private subscribeToClickEvents() {
    this.roomService.subscribeTo('profile-component-clicked')(data => {
      const e = data;
      if (e.target.id !== 'options-toggler') {
        this.optionsVisible = false;
      }
    });
  }

  private subscribeToRoomObservable() {
    const ifThisRoom = (roomId, cb = null) => {
      if (this.room && this.room.roomId === roomId) {
        if (cb) { cb(); }
      }
    };

    // events: selected
    this.roomService.eventProvider('selected')
      .subscribe((response: any) => {
        if (!this.room || this.room.roomId !== response.data.roomId) {
          this.roomSelected(response.data);
        }
      });

    // events: self-joined, self-left
    this.roomService.eventProvider('self-joined', 'self-left')
      .subscribe((response: any) => this.isMember = response.event === 'self-joined');

    // events: user-joined, user-left
    this.roomService.subscribeTo('user-joined')(data => {
      ifThisRoom(data.roomId, () => {
        if (this.room.users.find(user => user.userId === data.userId)) { return; }
        this.room.users.push({ userId: data.userId });
        this.addUpdate({
          type: 'notification',
          message: 'joined',
          senderId: data.userId,
          senderName: data.userName
        });
      });
    });
    this.roomService.subscribeTo('user-left')(data => {
      ifThisRoom(data.roomId, () => {
        if (!this.room.users.find(user => user.userId === data.userId)) { return; }
        this.room.users = this.room.users.filter(user => user.userId !== data.userId);
        this.addUpdate({
          type: 'notification',
          message: 'left',
          senderId: data.userId,
          senderName: data.userName
        });
      });
    });

    // events: deactivated, activated
    this.roomService.eventProvider('deactivated', 'activated')
      .subscribe((response: any) => {
        ifThisRoom(response.data, () => {
          this.room.active = response.event === 'activated';
          this.addUpdate({
            type: 'notification',
            message: response.event === 'deactivated' ? 'Room deactivated.' : 'Room activated.'
          });
        });
      });

    // events: deleted
    this.roomService.eventProvider('deleted')
      .subscribe((response: any) => ifThisRoom(response.data, () => this.room = null));

    // events: update
    this.roomService.eventProvider('update')
      .subscribe((response: any) => {
        ifThisRoom(response.data.roomId, () => this.addUpdate(response.data));
      });

    // events: typing
    this.roomService.eventProvider('typing')
      .subscribe((response: any) => {
        ifThisRoom(response.data.roomId, () => this.someUserTyping(response.data));
      });
  }

  private roomSelected(room: any) {
    this.totalUpdates = 0;
    this.page = 1;
    this.updates = [];
    this.room = room;
    this.isMember = this.room.users.find(user => user.userId === this.userId) ? true : false;
    this.updateLastViewed(room.roomId);
    this.roomService.getRoomUpdates(room.roomId, (this.page - 1) * this.limit, this.limit)
      .then((response2: any) => {
        this.page++;
        this.updates = response2.data.updates.reverse();
        this.totalUpdates = response2.data.count;
        this.scrollToBottom = true;
      })
      .catch(err => {});
  }

  private someUserTyping(data: any) {
    if (data.userId === this.userId) { return; }
    this.roomService.getUserById(data.userId)
      .then((response: any) => {
        if (this.userTypingTimer) {
          clearTimeout(this.userTypingTimer);
        }
        this.userTyping = `${response.data.name} is typing...`;
        this.userTypingTimer = setTimeout(() => this.userTyping = '', 500);
      })
      .catch(err => {});
  }

  private addUpdate(update) {
    if (!this.room) { return; }
    this.updates.push(update);
    console.log(this.updates);
    this.scrollToBottom = true;
    this.updateLastViewed(this.room.roomId);
  }

  private isSameSender(index: number, direction: string) {
    if (direction === 'prev' && index !== 0) {
      if (this.updates[index].senderId === this.updates[index - 1].senderId && this.updates[index - 1].type === 'chat') {
        return true;
      }
    } else if (direction === 'next' && index !== this.updates.length - 1) {
      if (this.updates[index].senderId === this.updates[index + 1].senderId && this.updates[index + 1].type === 'chat') {
        return true;
      }
    }
    return false;
  }

  private updateLastViewed(roomId: string, fromThisMethod = false) {
    // try updating 3 times if failed
    if (!fromThisMethod) {
      this.updateLastViewedCount = 3;
    }
    if (this.updateLastViewedCount === 0) { return; }
    this.roomService.updateLastViewed(roomId)
      .then(() => this.updateLastViewedCount = 3)
      .catch(err => {
        this.updateLastViewedCount--;
        this.updateLastViewed(roomId, true);
      });
  }

  private toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  private parseNotification(notification: any) {
    let str = '';
    if (notification.message === 'joined' || notification.message === 'left') {
      str += notification.senderId === this.userId ? 'You' : notification.senderName;
      str += ' ';
    }
    str += notification.message;
    return str;
  }

  private loadMore() {
    if (this.updates.length >= this.totalUpdates) {
      return;
    }
    this.loadingMoreMessages = true;
    this.messageContainerLastHeight = this.messageContainer.nativeElement.scrollHeight;
    this.roomService.getRoomUpdates(this.room.roomId, (this.page - 1) * this.limit, this.limit)
      .then((response: any) => {
        this.page++;
        this.updates = response.data.updates.reverse().concat(this.updates);
        this.scrollToBottom = true;
        this.loadingMoreMessages = false;
      })
      .catch(err => this.loadingMoreMessages = false);
  }

  private hideChats() {
    this.roomService.eventEmitter('hide-chats', null);
    this.roomService.currentOpenedRoomId = 0;
  }

  private typing() {
    this.roomService.eventEmitter(
      'typing',
      { roomId: this.room.roomId, userId: this.userId },
      'socket'
    );
  }

  sendMessage() {
    if (this.message) {
      this.roomService.sendMessage(this.room.roomId, this.message)
        .then(() => this.message = '')
        .catch(err => {});
    }
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.roomId)
      .then()
      .catch(err => {});
  }

  activateRoom() {
    this.roomService.activateRoom(this.room.roomId)
      .then(() => this.room.active = true)
      .catch(err => {});
  }

  deactivateRoom() {
    this.roomService.deactivateRoom(this.room.roomId)
      .then(() => this.room.active = false)
      .catch(err => {});
  }

  joinRoom() {
    this.roomService.joinRoom(this.room.roomId)
      .then(() => this.roomService.eventEmitter('self-joined', this.room))
      .catch(err => {});
  }

  leaveRoom() {
    this.roomService.leaveRoom(this.room.roomId)
      .then(() => this.roomService.eventEmitter('self-left', this.room.roomId))
      .catch(err => {});
  }

  showRoomInfo() {
    this.roomService.eventEmitter('show-room-details', this.room);
  }

  showInviteModal() {
    this.roomService.eventEmitter('show-invite-modal', { roomId: this.room.roomId });
  }

}
