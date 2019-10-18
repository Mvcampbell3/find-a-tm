import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userCheck = this.userService.user.subscribe((data: boolean) => this.user = data);
  user: boolean;
  displayMobile: boolean = false;
  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.checkUser();
  }

  ngOnDestroy() {
  }

  logoutUser() {
    this.userService.logoutUser();
  }

}
