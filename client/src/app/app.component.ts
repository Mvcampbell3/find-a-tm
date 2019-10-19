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
  loaded: boolean = false;

  classObject: object = {
    'mobile': true,
    'slideDown': this.displayMobile,
    'riseUp': !this.displayMobile
  }

  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.checkUser();
  }

  ngOnDestroy() {
  }

  logoutUser() {
    this.userService.logoutUser();
    this.displayMobile = false;
  }

  mobileNav() {
    if (!this.loaded) {
      this.loaded = true;
    }
    this.displayMobile = !this.displayMobile;
  }

  hideMobile() {
    this.displayMobile = false;
  }

  classFunction() {
    let classes = {
      'mobile': true,
      'slideDown': this.displayMobile,
      'slideUp': !this.displayMobile && this.loaded
    }

    return classes;
  }

}
