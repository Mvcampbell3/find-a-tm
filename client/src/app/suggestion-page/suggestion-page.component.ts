import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.scss']
})
export class SuggestionPageComponent implements OnInit {

  gameTitle: string = '';
  success: boolean = false;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.http.checkAuth().subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
        this.router.navigate(["/"])
      }
    )
  }

  addGameSuggestion() {
    if (this.gameTitle) {
      this.http.createSuggestion(this.gameTitle).subscribe(
        (data: any) => {
          console.log(data)
          // Positive feedback
          this.gameTitle = '';
          this.success = true;
        },
        (err: any) => {
          console.log(err)
          // Negative feedback
        }
      )
    } else {
      console.log('nothing added to make suggestion')
    }

  }

  getSuggestions() {
    this.http.getSuggestions().subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  createSuggestion(game_title) {

  }

  closeModal() {
    this.success = false;
  }

}
