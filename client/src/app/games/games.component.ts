import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../services/http.service";
import { UserService } from "../services/user.service";
import { Game } from "../models/game";
import { Router } from "@angular/router";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  gamesSubscription: any;
  profileSubscription: any;

  showGamesModal: Boolean = false;
  modalTop: Number = 0;
  gameTitle: string;
  gameSendID: string;

  games: Game[] = [];
  displayGames: Game[] = [];
  gameIDs: String[] = [];
  platformArray: string[] = [];
  gamePlatforms: string[] = [];

  showButtons: boolean = false;

  searchTerm: string = '';

  constructor(
    private http: HttpService,
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getGamesList();
    this.getUserProfile();
  }

  ngOnDestroy() {
    this.gamesSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  getGamesList() {
    this.gamesSubscription = this.http.getAllGames().subscribe(
      (result: Array<Game>) => {
        console.log(result);
        this.games = result;
        this.displayGames = result;
      },
      err => {
        console.log(err);
        this.router.navigate(["/"])
      }
    )
  }

  getUserProfile() {
    this.profileSubscription = this.http.getUserGamesList().subscribe(
      (result: any) => {
        console.log(result);
        const matrixes = result.matrixInfo;
        const userInfo = result.userInfo;
        this.gameIDs = [];
        matrixes.forEach((matrix) => this.gameIDs.push(matrix.gameID))
        console.log(this.gameIDs)
        this.platformArray = [];
        userInfo.platforms.forEach(plat => this.platformArray.push(plat))
        this.showButtons = true;
      },
      err => {
        console.log(err)
      }
    )
  }

  viewPlayers = (e) => {
    this.http.gameViewPlayers = e.target.value;
    this.router.navigate(['/listplayers'])
  }

  viewMatrix(e, title, gameID, gamePlatforms) {
    // Need to add platform Array for the game
    this.modalTop = window.scrollY;
    this.gameTitle = title;
    this.showGamesModal = true;
    this.gameSendID = gameID;
    this.gamePlatforms = gamePlatforms;
  }

  closeMatrix(value) {
    this.showGamesModal = value;
    this.getGamesList();
    this.getUserProfile();
  }

  setButtonsClass() {
    const classes = {
      'buttonArea': true,
      'hidden': !this.showButtons
    }

    return classes
  }

  searchGameTitles() {
    this.displayGames = this.games.filter(game => game.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
  }
}
