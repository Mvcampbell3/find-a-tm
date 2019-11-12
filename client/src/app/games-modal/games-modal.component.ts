import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-games-modal',
  templateUrl: './games-modal.component.html',
  styleUrls: ['./games-modal.component.scss']
})
export class GamesModalComponent implements OnInit {

  @Input() modalTop: number;
  @Input() gameTitle: string;
  @Input() gameID: string;
  // platformArray refers to user saved systems and tags
  @Input() platformArray: { 'system': string, 'gamerTag': string }[];
  // gamePlatforms refers to what systems the game can be played on
  @Input() gamePlatforms: { 'ps4': boolean, 'xbox': boolean, 'nin_switch': boolean };

  @Input() matrixInfo: { _id: string, platform: string, gamerTag: string, gameID: string }[];

  // displayPlatformArray refers to user tags being stripped of systems not supported by game
  displayPlatformArray: object[] = [];

  selfRating: number;
  gamePlatform: string;
  gamerTag: string;

  errorMessages: { msg: string }[] = [];

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private http: HttpService) { }

  ngOnInit() {
    // Also need to check on if game is saved on system with same tag
    this.defineDisplayPlatforms();
  }

  defineDisplayPlatforms() {
    let finalArr = [];
    if (this.gamePlatforms.ps4) {
      this.platformArray.filter(arr => arr.system === 'ps4').forEach(one => finalArr.push(one))
    }
    if (this.gamePlatforms.xbox) {
      this.platformArray.filter(arr => arr.system === 'xbox').forEach(one => finalArr.push(one))
    }
    if (this.gamePlatforms.nin_switch) {
      this.platformArray.filter(arr => arr.system === 'switch').forEach(one => finalArr.push(one))
    }
    this.matrixInfo.forEach((matrix, i) => {
      for (let j = 0; j < finalArr.length; j++) {
        if (matrix.platform === finalArr[j].system && matrix.gamerTag === finalArr[j].gamerTag && matrix.gameID === this.gameID) {
          finalArr.splice(j, 1);
        }
      }
    })
    if (finalArr.length > 0) {
      finalArr.forEach(one => this.displayPlatformArray.push(one))
    } else {
      // show user there are no available platforms to add
      this.errorMessages.push({msg: 'There are no available platforms to save'}, {msg: 'You can add one on your profile page'})
    }
  }

  closeModalFunc() {
    this.selfRating = null;
    this.gamePlatform = null;
    this.gamerTag = null;
    this.errorMessages = [];
    this.closeModal.emit(false);
  }

  createMatrix(e) {
    console.log(this.gameID);
    console.log(this.selfRating);
    this.errorMessages = [];
    if (this.gameID && this.selfRating && this.gamerTag) {
      this.http.createMatrix(this.gameID, this.selfRating, this.gamePlatform, this.gamerTag).subscribe(
        (data) => {
          console.log(data)
          this.closeModal.emit(false)
        },
        (err) => {
          console.log(err)
          this.errorMessages.push({ msg: 'There was an error on the server, please try again' })
        }
      )
    } else {
      if (!this.selfRating) {
        this.errorMessages.push({ msg: 'Missing self rating information' })
      }
      if (!this.gamerTag) {
        this.errorMessages.push({ msg: 'Missing platform' })
      }
    }

  }

  saveRating(e) {
    const buttons = [].slice.call(document.querySelectorAll(".skillBtn"));
    buttons.forEach(button => button.classList = "skillBtn");
    buttons[e.target.value - 1].classList.add("active");
    this.selfRating = e.target.value;
  }

  setPlatform(system, gamerTag) {
    console.log(system, gamerTag)
    this.gamePlatform = system;
    this.gamerTag = gamerTag;
  }

  setPlatformClass(system, gamerTag) {
    const classes = {
      'platform': true,
      'active': this.gamePlatform === system && this.gamerTag === gamerTag
    }
    return classes;
  }
}
