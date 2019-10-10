import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoginUser } from "../models/loginUser";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
    public userService: UserService,
    private router:Router) { }

  user = this.userService.user;

  ngOnInit() {
    // this.http.getAllUsers().subscribe(users => {
    //   console.log(users)
    // })
  }

  changeForm() {
    this.signup = !this.signup;
  }

  postSignupUser() {
    const { email, username, password } = this;
    this.http.signupUser(email, username, password).subscribe(
      (data:any) => {
        console.log(data);
      },
      err => {
        console.log(err)
      }
    )
  }

  postLoginUser() {
    const { email, password } = this;
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
        // need to find how to redirect inside angular
        // window.location.replace("/games")
        this.router.navigate(['/games'])

      },
      (error) => {
        console.log('we have an error', error);
      },
      () => {
        console.log('Http process ended');
      }
    );
  }
}
