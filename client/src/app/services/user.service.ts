import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpService } from "./http.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<boolean>(false);
  token: string = "this is not loaded";

  constructor(private http: HttpService, private router: Router) {
  }

  setUser(userBoolean: boolean, token?: string): void {
    this.user.next(userBoolean);
    this.token = token || "";
  }

  logoutUser() {
    this.user.next(false);
    localStorage.removeItem('token-find-tm');
    this.router.navigate(['/'])
  }

  checkUser() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    if (token) {
      console.log("token is here")
      this.http.checkAuth().subscribe(
        result => {
          console.log(result);
          this.user.next(true)
          // Make call to update last online date
          this.updateUserOnline();
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

  // This will run everytime that the user reloads the page, spec. navbar app.component
  // Do we want to update the time that much?
  updateUserOnline() {
    this.http.updateUserOnline().subscribe(
      result => console.log(result),
      err => console.log(err)
    )
  }

  
}
