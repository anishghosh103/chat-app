import { Component, OnInit } from '@angular/core';
import { trigger, state, keyframes, style, animate, transition } from '@angular/animations';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('flashAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 0.75 }))
      ]),
      transition(':leave', [
        style({ opacity: 0.75 }),
        animate(100, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  private queue = [];
  private messages = [];
  private flashState: string;
  private timer = null;
  private maximum = 1;

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.eventsService.subscribeTo('toast')(data => this.showToast(data));
  }

  private showToast(message: any) {
    if (this.messages.length >= this.maximum) {
      this.close(0);
    }
    this.messages.push(message);
    this.timer = setTimeout(() => this.close(0), 3000);
  }

  close(index: number) {
    this.messages.splice(index, 1);
  }

}
