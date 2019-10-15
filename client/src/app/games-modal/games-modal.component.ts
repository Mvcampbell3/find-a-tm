import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-games-modal',
  templateUrl: './games-modal.component.html',
  styleUrls: ['./games-modal.component.scss']
})
export class GamesModalComponent implements OnInit {

  @Input() modalTop: number;
  @Input() gameTitle: string;
  @Input() gameID: string;
  selfRating: number;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  closeModalFunc() {
    this.closeModal.emit(false);
  }

  createMatrix(e) {
    console.log(this.gameID);
    console.log(this.selfRating);
    this.http.createMatrix(this.gameID, this.selfRating).subscribe(
      (data) =>  console.log(data),
      (err) => console.log(err)
    )
  }

  saveRating(e) {
    const buttons = [].slice.call(document.querySelectorAll(".skillBtn"));
    buttons.forEach(button => button.classList = "skillBtn");
    buttons[e.target.value - 1].classList.add("active");
    this.selfRating = e.target.value;
  }
}
