import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-first-time-modal',
  templateUrl: './first-time-modal.component.html',
  styleUrls: ['./first-time-modal.component.scss']
})
export class FirstTimeModalComponent implements OnInit {

  @Input() username: string;

  sendIntroFalse: boolean = false;

  @Output() closeIntro = new EventEmitter<boolean>();

  constructor(private http: HttpService) { }

  ngOnInit() {

  }

  closeIntroFunction() {
    this.closeIntro.emit(this.sendIntroFalse);
  }

}
