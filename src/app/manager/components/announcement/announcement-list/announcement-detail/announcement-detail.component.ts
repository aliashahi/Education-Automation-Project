import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Announcement } from 'src/app/manager/models/announcement.model';

@Component({
  selector: 'EAP-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss'],
})
export class AnnouncementDetailDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AnnouncementDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Announcement
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
