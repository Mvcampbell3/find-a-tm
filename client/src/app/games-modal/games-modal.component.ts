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
  @Input() platformArray: {'system': string, 'gamerTag': string}[];
  selfRating: number;
  gamePlatform: string;
  gamerTag: string;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  closeModalFunc() {
    this.selfRating = null;
    this.gamePlatform = null;
    this.gamerTag = null;
    this.closeModal.emit(false);
  }

  createMatrix(e) {
    console.log(this.gameID);
    console.log(this.selfRating);
    this.http.createMatrix(this.gameID, this.selfRating, this.gamePlatform, this.gamerTag).subscribe(
      (data) =>  {
        console.log(data)
        this.closeModal.emit(false)
      },
      (err) => console.log(err)
    )
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
