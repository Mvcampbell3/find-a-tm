import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Suggestion } from "../models/dbSuggestion";
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  suggestions: Suggestion[] = [];

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.checkAdmin();
  }

  getSuggestions() {
    this.http.getSuggestions().subscribe(
      (data: Suggestion[]) => {
        console.log(data)
        this.suggestions = data;
        console.log(this.suggestions)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  checkAdmin() {
    this.http.checkAdmin().subscribe(
      (data: any) => {
        console.log(data)
        this.getSuggestions();
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

  
}
