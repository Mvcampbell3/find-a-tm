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

  games: Game[] = [];
  gameIDs: String[] = [];

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
      },
      err => {
        console.log(err);
        this.router.navigate(["/"])
      }
    )
  }

  getUserProfile() {
    const token = JSON.parse(localStorage.getItem('token-find-tm'));
    this.profileSubscription = this.http.getUserGamesList(token).subscribe(
      (result: any) => {
        console.log(result);
        const matrixes = result.matrixInfo;
        this.gameIDs = [];
        matrixes.forEach((matrix) => this.gameIDs.push(matrix.gameID))
        console.log(this.gameIDs)
      },
      err => {
        console.log(err)
      }
    )
  }
}
