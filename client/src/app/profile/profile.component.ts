import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userID: string;


  constructor(public userService: UserService, private http: HttpService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'))
    this.http.getUserProfile(token).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }





}