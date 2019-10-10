import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../services/http.service";
import { UserService } from "../services/user.service";
import { Game } from "../models/game";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  gamesSubscription: any;

  games: Game[] = [];

  constructor(
    private http: HttpService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getGamesList();
  }

  ngOnDestroy() {
    this.gamesSubscription.unsubscribe();
  }

  getGamesList() {
    this.gamesSubscription = this.http.getAllGames().subscribe(
      (result: Array<Game>) => {
        console.log(result);
        this.games = result;
      },
      err => {
        console.log(err);
        window.location.replace("/")
      },
      () => console.log("done")
    )
  }
}
