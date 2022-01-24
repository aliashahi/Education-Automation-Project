import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'EAP-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.scss'],
})
export class UploadProfileImageComponent implements OnInit {
  @Input() file!: File | string | undefined;
  @Input() placeholder: 'PROFILE' | 'CLASS' = 'PROFILE';
  @Output() fileChange: EventEmitter<File | string | undefined> =
    new EventEmitter();
  url!: string;
  @Input('url') set setUrl(v: string) {
    this.url = v;
    this.handleFileFromUrl();
  }

  showImage = true;
  constructor(
    private resourceSrv: ResourceService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {}

  private handleFileFromUrl() {
    this.resourceSrv.getBlobFile(this.url).subscribe((res) => {
      this.file = res;
      this.fileChange.emit(this.file);
    });
  }

  upload(event: any, type = 1) {
    if (type == 2) event = event.target.files;
    if (!event[0] || event[0].length == 0) return;
    if (!event[0].name.match(/\.(jpg|jpeg|png|gif)$/))
      this.alertSrv.showToaster('please upload image file!', 'WARNING');
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
