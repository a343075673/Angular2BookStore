import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl:  './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.logout();
  }

}
