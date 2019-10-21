import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() modalTop: number;
  @Input() gameTitle: string;
  @Input() gameID: string;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeModalFunc() {
    this.closeModal.emit(false);
  }
}
