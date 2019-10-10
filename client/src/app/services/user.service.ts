import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { HttpService } from "./http.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new Subject();
  token: string = "this is not loaded";

  constructor(private http: HttpService, private router: Router) {
  }

  setUser(userBoolean: boolean, token?: string): void {
    this.user.next(userBoolean);
    this.token = token || "";
  }

  logoutUser() {
    this.updateUserOffline();
    localStorage.removeItem('token-find-tm');
    // window.location.replace('/')
  }

  checkUser() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    console.log(token);
    if (token) {
      console.log("token is here")
      this.http.checkAuth(token).subscribe(
        result => {
          console.log(result);
          this.user.next(true)
          // Make call to update online of user
          this.updateUserOnline(token)
        },
        (err) => {
          console.log(err);
          this.user.next(false)
        }
      )
    } else {
      console.log("no token")
    }
  }

  updateUserOnline(token) {
    this.http.setUserOnline(token).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }

  updateUserOffline() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    if (token) {
      this.http.setUserOffline(token).subscribe(
        data => console.log(data),
        err => console.log(err)
      )
    }
  }
}
