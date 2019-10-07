import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoginUser } from "../models/loginUser";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: String = "";
  password: String = "";
  username: String = "";
  signup: Boolean = false;

  loginUser: LoginUser;


  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getAllUsers().subscribe(users => {
      console.log(users)
    })
  }

  changeForm() {
    this.signup = !this.signup;
  }

  sendInfo(): Observable<LoginUser> {
    console.log(this.signup);
    const { email, password, username } = this;
    console.log(email, password, username)

    // Need to learn more about setting up observables before we can move forward
    if (!username) {
      this.http.loginUser(email, password).subscribe(
        (data: LoginUser) => {
          console.log(data);
          this.loginUser = data;
        }),
        error => {
          console.log('we have an error', error);
          return;
        },
        () => console.log('Http process ended');
    } else {
      return;
    }
  }
}
