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

  showModal: Boolean = false;
  loginUser: LoginUser;

  errorMessages: { msg: string }[] = [];

  constructor(
    private http: HttpService,
    public userService: UserService,
    private router: Router) { }

  user = this.userService.user.subscribe();

  ngOnInit() {
  }

  changeForm() {
    this.signup = !this.signup;
  }

  changeModal() {
    console.log(this.userService.user.value)
    if (this.userService.user.value) {
      this.router.navigate(['/games'])
    } else {
      this.showModal = !this.showModal;
    }
  }

  hideModal(event) {
    if (event.target.classList.value === 'modalLogin') {
      this.showModal = false;
      this.signup = false;
    }
  }

  postSignupUser() {

    this.errorMessages = [];

    const { email, username, password } = this;

    if (email && username && password) {
      this.http.signupUser(email, username, password).subscribe(
        (data: any) => {
          console.log(data);
          this.signup = false;
          this.errorMessages.push({msg: 'You are signed up! Just need to login'})
        },
        err => {
          console.log(err)
          console.log(err.error)
          try {
            this.errorMessages.push({ msg: err.error.message })
          } catch (notright) {
          }

          try {
            if (err.error.err.code === 11000) {
              this.errorMessages.push({ msg: 'Username already in use' })
            }
          } catch (alsonotright) {
          }
        }
      )
    } else {
      if (!email) {
        this.errorMessages.push({ msg: 'Please Enter Email' })
      }
      if (!username) {
        this.errorMessages.push({ msg: 'Please Enter Username' })
      }
      if (!password) {
        this.errorMessages.push({ msg: 'Please Enter Password' })
      }
    }


  }

  postLoginUser() {

    this.errorMessages = [];

    const { email, password } = this;

    if (email && password) {
      this.http.loginUser(email, password).subscribe(
        (data: LoginUser) => {
          console.log(data);
          this.errorMessages = [];
          this.loginUser = data;
          this.userService.setUser(true, this.loginUser.token)
          localStorage.setItem("token-find-tm", JSON.stringify(this.userService.token));
          this.userService.updateUserOnline()
          this.router.navigate(['/games'])
        },
        (error) => {
          console.log('we have an error', error);
          console.log(error.status)
          if (error.status === 401) {
            this.errorMessages.push({ msg: "Incorrect email and/or password" })
          }
        }

      );
    } else {
      if (!email) {
        this.errorMessages.push({ msg: 'Please Enter Email' })
      }
      if (!password) {
        this.errorMessages.push({ msg: 'Please Enter Password' })
      }
    }


  }
}
