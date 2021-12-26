import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FileDto } from 'src/app/shared/models/file.dto';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { Resource } from 'src/app/teacher/models/resource.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'EAP-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.scss'],
})
export class ViewResourcesComponent implements OnInit {
  @Input() classId!: number;
  filesList: Resource[] = [];
  files: FileDto[] = [];
  fileToUpload: FileDto[] = [];
  // input data
  // file?: File;
  title!: string | null;
  desc!: string | null;

  pending = false;
  constructor(
    private alertSrv: AlertService,
    private resourceSrv: ResourceService,
    private dialog: MatDialog
  ) {}

  public get imageBaseUrl(): string {
    return this.resourceSrv.imageBaseUrl;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.pending = true;
    this.resourceSrv.getClassResources(this.classId).subscribe(
      (res) => {
        this.filesList = res.results;
        this.files = res.results.map((i: any) => {
          return {
            id: i.id - 1,
            name: i.file.split('/')[i.file.split('/').length - 1],
            file: this.imageBaseUrl + i.file,
          };
        });
        this.pending = false;
      },
      (e) => {
        this.pending = false;
      }
    );
  }

  onSubmit() {
    let formData = new FormData();
    formData.append(
      'file',
      this.fileToUpload[0].file ?? '',
      this.fileToUpload[0]?.name
    );
    formData.append('title', this.title ?? '');
    formData.append('description', this.desc ?? '');
    this.pending = true;
    this.resourceSrv.uploadClassResourceFile(this.classId, formData).subscribe(
      (res) => {
        this.fileToUpload = [];
        this.title = null;
        this.desc = null;
        this.pending = false;
        this.alertSrv.showToaster('Resource added Successfully!', 'SUCCESS');
        this.getData();
      },
      (e) => {
        this.pending = false;
      }
    );
  }

  onDownload(url: string) {
    window.open(url, '_blank');
  }

  onDelete(id: number) {
    this.dialog.open(ConfirmDialog, {
      data: {
        submitFn: () => {
          this.pending = true;
          this.resourceSrv.deleteClassResource(this.classId, id).subscribe(
            (res) => {
              this.alertSrv.showToaster(
                'Resource deleted Successfully!',
                'SUCCESS'
              );
              this.pending = false;
              this.getData();
            },
            (e) => {
              this.pending = false;
            }
          );
        },
      },
    });
  }
}
