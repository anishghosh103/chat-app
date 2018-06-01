import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss']
})
export class InviteModalComponent implements OnInit {

  private roomId = '';
  private email = '';
  // FIXME: change the domain accordingly.
  private baseUrl = 'http://localhost:3000/invite/';

  private show = false;
  private processing = false;

  constructor(
    private eventsService: EventsService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.eventsService.subscribeTo('show-invite-modal')(data => {
      this.roomId = data.roomId;
      this.show = true;
    });
  }

  sendLink() {
    this.processing = true;
    const link = this.baseUrl + this.roomId;
    this.apiService.sendInviteLink(this.roomId, this.email)
      .then(() => {
        this.email = '';
        this.processing = false;
        this.eventsService.emit('toast', { type: 'info', title: 'Invitation Link Sent', body: '' });
      })
      .catch(err => {
        this.processing = false;
        this.eventsService.emit('toast', { type: 'error', title: 'Error', body: err });
      });
  }

  close() {
    this.show = false;
  }

}
