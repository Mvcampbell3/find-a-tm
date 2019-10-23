import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

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
  modalIDSend: string;
  showDelModal: boolean = false;
  showAddPlat: boolean = false;
  addPlatClicked: boolean = false;

  deleteActive: boolean = false;

  addPlatformPlat: string;
  addPlatformTag: string;


  constructor(public userService: UserService, private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getGamesList()
  }

  toggleDelete() {
    this.deleteActive = !this.deleteActive;
  }

  handleClick(matrixID, title, gameID) {
    console.log(matrixID, title);
    if (this.deleteActive) {
      console.log('This will be deleted')
      this.modalIDSend = matrixID;
      this.gameTitleSend = title;
      this.modalTop = window.scrollY;
      this.showDelModal = true;
    } else {
      console.log('This will be sent to game list players page')
      this.http.gameViewPlayers = gameID;
      this.router.navigate(['/listplayers'])
    }
  }

  closeModalFunc(value) {
    this.showDelModal = value;
    this.getGamesList();
  }

  getGamesList() {
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

  platClasses(check) {
    const classes = {
      'plat': true,
      'open': check !== this.addPlatformPlat,
      'selected': check === this.addPlatformPlat
    }

    return classes
  }

  setPlat(value) {
    this.addPlatformPlat = value;
  }

  setAddClass() {
    const classes = {
      'add-platforms': true,
      'drop': this.showAddPlat,
      'lift': !this.showAddPlat && this.addPlatClicked
    }
    return classes;
  }

  editClick() {
    if (!this.showAddPlat) {
      this.showAddPlat = true;
      this.addPlatClicked = true;
    } else {
      this.showAddPlat = false;
      this.addPlatClicked = true;
    }
  }

  sendToGamesPage() {
    this.router.navigate(['/games'])
  }

}
