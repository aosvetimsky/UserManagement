import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  text: '';
  title: '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: '', title: '' }) {
      this.title = data.title;
      this.text = data.text;
  }

  async yes() {
    this.dialogRef.close(true);
  }

  async no() {
    this.dialogRef.close(false);
  }
}
