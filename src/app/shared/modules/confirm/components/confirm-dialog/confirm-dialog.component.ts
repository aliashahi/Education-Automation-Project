import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmDialogDto } from '../../models/confirm-dialog.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'EAP-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDto
  ) {}

  ngOnInit(): void {}

  onCancel() {
    if (this.data && this.data.cancelFn) {
      if (typeof this.data.cancelFn === 'function') {
        this.data.cancelFn();
      }
    }
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (this.data && this.data.submitFn) {
      if (typeof this.data.submitFn === 'function') {
        this.data.submitFn();
      }
    }
    this.dialogRef.close(true);
  }
}
