import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Suggestion } from "../models/dbSuggestion";
import { Game } from "../models/game";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  suggestions: Suggestion[] = [];
  games: Game[] = [];

  displaySuggestions: boolean = false;
  displayGames: boolean = false;

  gameDeleteOnce: boolean = false;
  gameDeleteID: string = '';

  game_title: string = '';
  developer: string = '';
  createUserID: string = '';
  ps4: boolean = false;
  xbox: boolean = false;
  switch: boolean = false;
  team_game: boolean = false;
  gameImgUrl: string = '';

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.checkAdmin();
  }

  getSuggestions() {
    this.http.getSuggestions().subscribe(
      (data: Suggestion[]) => {
        console.log(data)
        this.suggestions = data;
        this.displayGames = false;
        this.displaySuggestions = true;
        console.log(this.suggestions)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  getGames() {
    this.http.getAllGames().subscribe(
      (data: Game[]) => {
        console.log(data);
        this.games = data;
        this.displaySuggestions = false;
        this.displayGames = true;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  viewPlayers = (e) => {
    this.http.gameViewPlayers = e.target.value;
    this.router.navigate(['/listplayers'])
  }

  getInfo(info) {
    switch (info) {
      case 'games':
        console.log('would look up games and display them');
        this.getGames();
        break;
      case 'suggestions':
        console.log('would look up suggestions and display them');
        this.getSuggestions();
        break;
      default:
        console.log('getInfo switch not working as expected')
    }
  }

  checkAdmin() {
    this.http.checkAdmin().subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err);
        this.router.navigate(['/games'])
      }
    )
  }

  deleteSuggestion(id) {
    console.log(id);
    this.http.deleteSuggestion(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getSuggestions();
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  deleteGame(id) {
    if (id !== this.gameDeleteID) {
      console.log(id)
      this.gameDeleteOnce = true;
      this.gameDeleteID = id;
    } else {
      // call for game del http
      this.http.deleteGame(id).subscribe(
        (data: any) => {
          console.log(data);
          this.getGames();
        },
        (err: any) => {
          console.log(err)
        }
      )
    }
  }

  cancelDelete() {
    this.gameDeleteOnce = false;
    this.gameDeleteID = '';
  }

  displayTime(time) {
    const timefix = new Date();
    timefix.setTime(time)
    return timefix.toDateString()
  }

  changeAdded(id, added) {
    this.http.changeAddedSuggestion(id, added).subscribe(
      (data: any) => {
        console.log(data);
        this.getSuggestions();
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  checkInput() {
    console.log(this.game_title, this.developer, this.createUserID, this.gameImgUrl)
    console.log(this.ps4, this.xbox, this.switch, this.team_game)
    console.log(this.addGameToDB())
  }

  addGameToDB() {
    const game = {
      game_title: this.game_title,
      developer: this.developer,
      ps4: this.ps4,
      xbox: this.xbox,
      nin_switch: this.switch,
      team_game: this.team_game,
      img_url: this.gameImgUrl,
      userID: this.createUserID
    }
    console.log(game);

    this.http.createGame(game).subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
