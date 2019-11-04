import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { UserInfoObject } from '../models/userInfoObject';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfoObject;
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

  deleteType: string = null;

  deleteSystem: string = null;
  deleteGamerTag: string = null;

  platformErrorMessages: { msg: string }[] = [];


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
      this.deleteType = 'matrix'
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
    this.http.getUserProfile().subscribe(
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
      this.closePlatModal()
    }
  }

  sendToGamesPage() {
    this.router.navigate(['/games'])
  }

  closePlatModal() {
    this.showAddPlat = false;
    this.addPlatClicked = true;
    this.addPlatformPlat = null;
    this.addPlatformTag = null;

    this.deleteGamerTag = null;
    this.deleteSystem = null;
  }

  handleAddPlatform() {
    console.log('clicked')
    this.platformErrorMessages = [];
    console.log(this.addPlatformPlat, this.addPlatformTag)
    if (this.addPlatformPlat && this.addPlatformTag) {

      const systems = this.userInfo.platforms.map(platform => platform.system);
      const gamerTags = this.userInfo.platforms.map(platform => platform.gamerTag);

      let allowCreate = false;

      const loopTags = () => {
        console.log('looping through tags');
        if (gamerTags.indexOf(this.addPlatformTag) !== -1) {
          if (systems[gamerTags.indexOf(this.addPlatformTag)] === this.addPlatformPlat) {
            this.platformErrorMessages.push({ msg: `Already have ${this.addPlatformTag} for ${this.addPlatformPlat}` })
            console.log(this)
            console.log('already system w/ gamertag')
            return;
          } else {
            systems.splice(gamerTags.indexOf(this.addPlatformTag), 1);
            loopTags();
          }
        } else {
          console.log('unique gamertag')
          allowCreate = true;
        }
      }

      loopTags()

      if (allowCreate) {
        // Send http request
        this.http.addPlatform(this.addPlatformPlat, this.addPlatformTag).subscribe(
          (data: any) => {
            console.log(data)
            this.getGamesList();
            this.closePlatModal()
          },
          (err: any) => {
            console.log(err)
            this.platformErrorMessages.push({msg: "Server unable to complete task, please try again"})
          }
        )
      }




    }
  }

  handleDeletePlatform(system, gamerTag) {
    console.log(system, gamerTag);
    this.deleteType = 'platform';
    this.deleteSystem = system;
    this.deleteGamerTag = gamerTag;
    this.showDelModal = true;
  }

}
