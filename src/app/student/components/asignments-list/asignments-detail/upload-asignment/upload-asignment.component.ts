import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-upload-asignment',
  templateUrl: './upload-asignment.component.html',
  styleUrls: ['./upload-asignment.component.scss'],
})
export class UploadAsignmentComponent implements OnInit {
  loading = false;
  avatarUrl?: string;

  constructor(private alertSrv: AlertService) {}

  ngOnInit(): void {}

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.alertSrv.showToaster('You can only upload JPG file!', 'WARNING');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.alertSrv.showToaster('Image must smaller than 2MB!', 'WARNING');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.type == 'success') console.log(info.file.response.url);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.alertSrv.showToaster('Network error', 'WARNING');
        this.loading = false;
        break;
    }
  }
}
