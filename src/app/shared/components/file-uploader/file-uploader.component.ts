import { FileDto } from '../../models/file.dto';
import { AlertService } from '../../modules/alert/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  filesToShow: FileDto[] = [];
  @Input() set files(v: FileDto[]) {
    v.map((i) => {
      this.previewList.set(i.id, i.file);
    });
    this.filesToShow = v;
  }

  @Output() filesChange: EventEmitter<FileDto[]> = new EventEmitter<
    FileDto[]
  >();

  @Output() onDeleteEvent: EventEmitter<number> = new EventEmitter<number>();

  previewList: Map<number, any> = new Map();
  @Input() pending: boolean = false;
  @Input() hasDelete: boolean = true;
  @Input() hasDownload: boolean = false;
  @Input() hasUpload: boolean = true;
  @Input() maxCount: number = 0; //zero means infinite

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  onDelete(file: FileDto) {
    if (this.pending) return;
    if (file.yet_to_upload) {
      this.filesToShow = this.filesToShow.filter((i) => i.id != file.id);
      this.previewList.delete(file.id);
      this.filesChange.emit(this.filesToShow);
    } else {
      this.onDeleteEvent.emit(file.id);
    }
  }

  upload(event: any, type = 1) {
    if (this.maxCount != 0 && this.filesToShow.length == this.maxCount) return;
    if (this.pending) return;
    if (type == 2) event = event.target.files;
    if (!event[0] || event[0].length == 0) return;
    if (event[0].size > 500000) {
      this.alertService.showToaster(
        'you cant upload files with size more than 5MB!',
        'WARNING'
      );
      return;
    }
    this.createAPreview(event[0], this.filesToShow.length);
  }

  onDownload(data: any) {
    window.open(data, '_blank');
  }

  private createAPreview(file: File, id: number) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewList.set(id, e.target.result);
      this.filesToShow.push({
        id: this.filesToShow.length,
        file: file,
        name: file.name,
        yet_to_upload: true,
      });
      this.filesChange.emit(this.filesToShow);
    };
    reader.readAsDataURL(file);
  }
}
