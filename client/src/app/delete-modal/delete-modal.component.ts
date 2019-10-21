import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() modalTop: number;
  @Input() gameTitle: string;
  @Input() modalID: string;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  closeModalFunc() {
    this.closeModal.emit(false);
  }

  deleteMatrix() {
    this.http.deleteMatrix(this.modalID).subscribe(
      (data: any) => {
        console.log(data)
        this.closeModal.emit(false);
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
