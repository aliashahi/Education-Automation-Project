import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
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
  // input data
  file?: File;
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
        this.pending = false;
      },
      (e) => {
        this.pending = false;
      }
    );
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('file', this.file ?? '', this.file?.name);
    formData.append('title', this.title ?? '');
    formData.append('description', this.desc ?? '');
    this.pending = true;
    this.resourceSrv.uploadClassResourceFile(this.classId, formData).subscribe(
      (res) => {
        this.file = undefined;
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

  upload(event: any, type = 1) {
    if (this.pending) return;
    if (type == 2) event = event.target.files;
    if (!event[0] || event[0].length == 0) return;
    this.file = event[0];
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
