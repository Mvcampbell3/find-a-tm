import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

  changeForm() {
    this.signup = !this.signup;
  }

  sendInfo() {
    console.log(this.signup);
    const { email, password, username } = this;
    console.log(email, password, username)
  }

}
