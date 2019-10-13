import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-listplayers',
  templateUrl: './listplayers.component.html',
  styleUrls: ['./listplayers.component.scss']
})
export class ListplayersComponent implements OnInit {

  playersList: object[] = [];

  constructor(private http: HttpService, private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.http.getPlayersListGame(this.http.gameViewPlayers).subscribe(
      (result: object[]) => console.log(result),
      (err:any) => console.log(err)
    )
  }

}
