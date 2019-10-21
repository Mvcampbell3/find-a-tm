import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: object;
  matrixInfo: object[];

  newGame: string = '';
  newRating: number = 0;

  modalTop: number = 0;
  gameTitleSend: string;
  gameIDSend: string;
  showDelModal: boolean = false;

  deleteActive: boolean = false;


  constructor(public userService: UserService, private http: HttpService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'))
    this.http.getUserProfile(token).subscribe(
      (data: any) => {
        console.log(data)
        console.log(data.userInfo)
        this.userInfo = data.userInfo;
        this.matrixInfo = data.matrixInfo;
      },
      err => console.log(err)
    )
  }

  toggleDelete() {
    this.deleteActive = !this.deleteActive;
  }

  handleClick(id, title) {
    console.log(id, title);
    if (this.deleteActive) {
      console.log('This will be deleted')
      this.gameIDSend = id;
      this.gameTitleSend = title;
      this.modalTop = window.scrollY;
      this.showDelModal = true;
    } else {
      console.log('This will be sent to game list players page')
    }
  }

  closeModalFunc(value) {
    this.showDelModal = value
  }


}
