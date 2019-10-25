import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PlayerMatrix } from "../models/player";

@Component({
  selector: 'app-listplayers',
  templateUrl: './listplayers.component.html',
  styleUrls: ['./listplayers.component.scss']
})
export class ListplayersComponent implements OnInit {

  playersList: PlayerMatrix[] = [];
  gameInfo: object = null;

  constructor(private http: HttpService, private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.getPlayersList();
    this.getGameInfo();
  }

  getPlayersList() {
    this.http.getPlayersListGame(this.http.gameViewPlayers).subscribe(
      (result: PlayerMatrix[]) => {
        console.log(result);
        this.playersList = result;
        this.setDates()
      },
      (err: any) => console.log(err)
    )
  }

  getGameInfo() {
    this.http.getGameInfo(this.http.gameViewPlayers).subscribe(
      (data: any) => {
        console.log(data);
        this.gameInfo = data
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  setDates() {
    if (this.playersList.length > 0) {

      this.playersList.forEach((player, i) => {

        const userDate: string = player.userID.lastOnline;
        console.log(userDate, Date.now())
        const diff: number = Math.abs(parseInt(userDate) - Date.now()) / 60000;

        console.log(diff.toFixed(4))

        if (diff >= 3600) {
          this.playersList[i].latest = `${(diff / (60 * 24)).toFixed()} day(s) ago`;
        } else if (diff >= 60) {
          this.playersList[i].latest = `${(diff / 60).toFixed()} hour(s) ago`
        } else {
          this.playersList[i].latest = `${diff.toFixed()} min(s) ago`
        }

      })
    }
  }

}
