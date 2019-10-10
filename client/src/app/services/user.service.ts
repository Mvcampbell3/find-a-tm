import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new Subject();
  token: string = "this is not loaded";

  constructor(private http: HttpService) {
  }

  setUser(userBoolean: boolean, token?: string): void {
    this.user.next(userBoolean);
    this.token = token || "";
  }

  logoutUser() {
    localStorage.removeItem('token-find-tm');
    window.location.replace('/')
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

}
