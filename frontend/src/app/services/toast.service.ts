import { Injectable } from '@angular/core';
import { EventsService } from './events.service';

@Injectable()
export class ToastService {

  constructor(
    private eventsService: EventsService
  ) { }

  error(title: string, body: string = '') {
    this.eventsService.emit('toast', { type: 'error', title, body });
  }

  info(title: string, body: string = '') {
    this.eventsService.emit('toast', { type: 'info', title, body });
  }

}
