import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../services/api.service';
import { EventsService } from '../services/events.service';
import { ToastService } from '../services/toast.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {

  public currentOpenedRoomId = null;

  public  = this.eventsService.emit;

  constructor(
    private apiService: ApiService,
    private eventsService: EventsService,
    private toastService: ToastService
  ) { }

  eventEmitter(event, data, option = 'observable') {
    return this.eventsService.emit(event, data, option);
  }

  eventProvider(...events) {
    return this.eventsService.provider(...events);
  }

  subscribeTo(...events) {
    return this.eventsService.subscribeTo(...events);
  }

  private promise(cb) {
    const obj = {};
    return new Promise((resolve, reject) => {
      cb({
        set: (key, value) => obj[key] = value,
        success: () => resolve(obj),
        err: (
          showToast,
          errorTitle = 'Something went wrong.',
          errorBody = 'Please try again.'
        ) => {
          if (showToast) { this.toastService.error(errorTitle, errorBody); }
          reject(obj);
        }
      });
    });
  }

  logout() {
    return this.promise(cb => {
      this.apiService.logout()
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true, response.message);
            }
          },
          err => cb.err(true, 'Logout unsuccessful.')
        );
    });
  }

  setRoom(roomId: String) {
    if (window.innerWidth < 576) { this.eventEmitter('show-chats', null); }
    this.apiService.getRoomById(roomId)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.currentOpenedRoomId = roomId;
            this.eventEmitter('selected', response.data);
            if (window.innerWidth < 576) { this.eventEmitter('show-chats', null); }
          }
        },
        err => this.toastService.error('Something went wrong.', 'Please try again.')
      );
  }

  getUserById(userId: string) {
    return this.promise(cb => {
      this.apiService.getUserById(userId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('data', response.data);
              cb.success();
            } else {
              cb.set('error', response.message);
              cb.err();
            }
          },
          err => cb.err()
        );
    });
  }

  getRoomById(roomId: String) {
    return this.promise(cb => {
      this.apiService.getRoomById(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('data', response.data);
              cb.success();
            } else {
              cb.err();
            }
          },
          err => cb.err()
        );
    });
  }

  getRoomsOfCurrentUser() {
    return this.promise(cb => {
      this.apiService.getRoomsOfCurrentUser()
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('rooms', response.data);
              cb.success();
            } else {
              cb.set('message', response.message);
              cb.err();
            }
          },
          err => {
            cb.set('message', 'Error occurred.');
            cb.err();
          }
        );
    });
  }

  getActiveRooms() {
    return this.promise(cb => {
      this.apiService.getActiveRooms()
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('data', response.data);
              cb.success();
            } else {
              cb.set('error', response.message);
              cb.err();
            }
          },
          err => cb.err()
        );
    });
  }

  getRoomUpdates(roomId: String, skip: number, limit: number) {
    return this.promise(cb => {
      this.apiService.getRoomUpdates(roomId, skip, limit)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('data', response.data);
              cb.success();
            }
            cb.err();
          },
          err => cb.err()
        );
    });
  }

  createRoom(room: any) {
    return this.promise(cb => {
      this.apiService.createRoom(room)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else if (response.status === 409) {
              cb.set('name', response.message);
              cb.err();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  updateRoomDetails(roomId: string, roomDetails: any) {
    return this.promise(cb => {
      this.apiService.updateRoomDetails(roomId, roomDetails)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true, response.message);
            }
          },
          err => cb.err(true)
        );
    });
  }

  deleteRoom(roomId: String) {
    return this.promise(cb => {
      this.apiService.deleteRoom(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  activateRoom(roomId: String) {
    return this.promise(cb => {
      this.apiService.activateRoom(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  deactivateRoom(roomId) {
    return this.promise(cb => {
      this.apiService.deactivateRoom(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  joinRoom(roomId, showToast = true) {
    return this.promise(cb => {
      this.apiService.joinRoom(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.set('room', response.data);
              cb.success();
            } else {
              cb.set('message', response.message);
              cb.err(showToast);
            }
          },
          err => cb.err(showToast)
        );
    });
  }

  leaveRoom(roomId) {
    return this.promise(cb => {
      this.apiService.leaveRoom(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  sendMessage(roomId: String, message: String) {
    return this.promise(cb => {
      this.apiService.sendMessage(roomId, message)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err(true);
            }
          },
          err => cb.err(true)
        );
    });
  }

  updateLastViewed(roomId: string) {
    return this.promise(cb => {
      this.apiService.updateLastViewed(roomId)
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              cb.success();
            } else {
              cb.err();
            }
          },
          err => cb.err()
        );
      });
  }

}
