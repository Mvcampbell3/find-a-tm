import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.scss']
})
export class SuggestionPageComponent implements OnInit {

  gameTitle: string = '';

  constructor() { }

  ngOnInit() {
  }

  addGameSuggestion() {
    console.log(this.gameTitle)
  }

}
