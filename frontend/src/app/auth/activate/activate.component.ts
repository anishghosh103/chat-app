import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  private activated = false;
  private error = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.authService.activateAccount(token)
      .then(() => this.activated = true)
      .catch(err => this.error = err.error);
  }

}
