import { Injectable } from '@angular/core';

import io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {

  private eventSubject = new Subject<any>();
  private event$ = this.eventSubject.asObservable();
  private socket = io.connect('http://localhost:3000/room');

  constructor(private apiService: ApiService) {
    this.setSocketListener();
  }

  private setSocketListener() {
    this.socket.on('deactivated', (roomId) => {
      this.eventSubject.next({ event: 'deactivated', data: roomId });
    });
    this.socket.on('activated', (roomId) => {
      this.eventSubject.next({ event: 'activated', data: roomId });
    });
    this.socket.on('update', (data) => {
      this.eventSubject.next({ event: 'update', data });
    });
    this.socket.on('created', (room) => {
      this.eventSubject.next({ event: 'created', data: room });
    });
    this.socket.on('deleted', roomId => {
      this.eventSubject.next({ event: 'deleted', data: roomId });
    });
    this.socket.on('joined', (data) => {
      this.eventSubject.next({ event: 'user-joined', data });
    });
    this.socket.on('left', (data) => {
      this.eventSubject.next({ event: 'user-left', data });
    });
    this.socket.on('typing', data => {
      this.eventSubject.next({ event: 'typing', data });
    });
  }

  /**
   * Event Emitter
   * @param event Name of the event
   * @param data Data to be emitted
   * @param option 'observable', 'socket', 'both'
   */
  emit(event, data, option = 'observable') {
    if (option === 'both' || option === 'socket') {
      this.socket.emit(event, data);
    }
    if (option === 'both' || option === 'observable') {
      this.eventSubject.next({ event, data });
    }
  }

  /**
   * Returns an observable with data
   * @param event Name of the event to subscribe to
   */
  provider(...events) {
    return new Observable(observer => {
      this.event$.subscribe(
        (response: any) => {
          if (events.includes(response.event)) {
            observer.next(response);
          }
        }
      );
    });
  }

  /**
   * Subscribe to some events
   * Returns a function which takes a callback as parameter
   * @param events {String[]} Array of event names
   */
  subscribeTo(...events) {
    return (callback) => {
      this.event$.subscribe(
        (response: any) => {
          if (events.includes(response.event)) {
            callback(response.data, response.event);
          }
        }
      );
    };
  }
}
