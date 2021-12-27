import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.scss'],
})
export class UploadProfileImageComponent implements OnInit {
  @Input() file!: File | string;
  @Output() fileChange: EventEmitter<File | string> = new EventEmitter();
  @Input() url!: string;
  showImage = true;
  constructor() {}

  ngOnInit(): void {}

  upload(event: any, type = 1) {
    if (type == 2) event = event.target.files;
    if (!event[0] || event[0].length == 0) return;
    this.createAPreview(event[0]);
  }

  private createAPreview(file: File) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.url = e.target.result;
      this.showImage = true;
      this.file = file;
      this.fileChange.emit(this.file);
    };
    reader.readAsDataURL(file);
  }
}
