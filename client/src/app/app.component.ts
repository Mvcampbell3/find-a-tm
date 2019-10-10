import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  userCheck = this.userService.user.subscribe((data: boolean) => this.user = data);
  user: boolean;
  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.checkUser();
  }

  logoutUser() {
    this.userService.logoutUser();
  }
}
