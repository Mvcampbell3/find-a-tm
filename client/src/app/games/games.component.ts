import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from "../services/http.service";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { Game } from "../models/game";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  suscription1: any;
  suscription2: any;

  games: any = [];

  constructor(
    private http: HttpService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getUserAuth();
    this.getGamesList();
  }

  ngOnDestroy() {
    this.suscription1.unsubscribe();
    this.suscription2.unsubscribe();
  }

  getGamesList() {
    this.suscription1 = this.http.getAllGames().subscribe(
      result => {
        console.log(result);
        this.games = result;
      },
      err => console.log(err),
      () => console.log("done")
    )
  }

  getUserAuth() {
    this.suscription2 = this.http.authUser().subscribe(
      result => console.log(result),
      err => console.log(err),
      () => console.log("done")
    )
  }

}
