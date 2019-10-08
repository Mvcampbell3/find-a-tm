import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoginUser } from "../models/loginUser";
import { UserService } from '../services/user.service';

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

  constructor(
    private http: HttpService,
    public userService: UserService) { }

  user = this.userService.user;

  ngOnInit() {
    this.http.getAllUsers().subscribe(users => {
      console.log(users)
    })

  }

  changeForm() {
    this.signup = !this.signup;
  }

  sendInfo() {
    console.log(this.signup);
    const { email, password, username } = this;
    console.log(email, password, username)

    if (!username) {
      this.http.loginUser(email, password).subscribe(
        (data: LoginUser) => {
          console.log(data);
          this.loginUser = data;
          this.userService.setUser(true, this.loginUser.token)
          console.log(this.user)
          console.log(this.userService.user)
          console.log(this.userService.token);
          // send to new page
          localStorage.setItem("token-find-tm", JSON.stringify(this.userService.token));
          window.location.replace("/games")

        },
        (error) => {
          console.log('we have an error', error);
        },
        () => {
          console.log('Http process ended');
          if (this.userService.user) {
            // window.location.replace("/games")
          }
        }
      );
    }
  }
}
