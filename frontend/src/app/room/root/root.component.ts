import { Component, OnInit, HostListener } from '@angular/core';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  private showChats = false;
  private notification = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 576) { this.showChats = false; }
  }

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomService.subscribeTo('show-chats')(() => this.showChats = true);
    this.roomService.eventProvider('hide-chats')
      .subscribe(() => this.showChats = false);
  }

  logout() {
    this.roomService.logout()
      .then(() => {
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
      })
      .catch(err => {});
  }

  onClick(e) {
    this.roomService.eventEmitter('profile-component-clicked', e);
  }

  doShowChat() {
    return (window.innerWidth >= 576 || this.showChats);
  }

  doShowRouterOutlet() {
    return (window.innerWidth >= 576 || !this.showChats);
  }

  hideChat() {
    if (window.innerWidth < 576) {
      this.showChats = false;
    }
  }

}
