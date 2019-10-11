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
    this.user.next(false);
    localStorage.removeItem('token-find-tm');
    this.router.navigate(['/'])
  }

  checkUser() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    if (token) {
      console.log("token is here")
      this.http.checkAuth(token).subscribe(
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

  updateUserOnline() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    this.http.updateUserOnline(token).subscribe(
      result => console.log(result),
      err => console.log(err)
    )
  }

  
}
