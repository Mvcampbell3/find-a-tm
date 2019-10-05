import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

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


  constructor(private http: HttpService) { }

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

    // Need to learn more about setting up observables before we can move forward
    if (!username) {
      this.http.loginUser(email, password).subscribe(
        data => {
          console.log(data);
        }),
        error => {
          console.log('we have an error');
          console.log(error)
        }
    }
  }

}
