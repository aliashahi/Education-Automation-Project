import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/teacher/models/resource.model';
import { ClassService } from 'src/app/shared/services/class.service';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'EAP-student-resources',
  templateUrl: './student-resources.component.html',
  styleUrls: ['./student-resources.component.scss'],
})
export class StudentResourcesComponent implements OnInit {
  classId!: number;
  filesList!: Resource[];
  // input data

  pending = false;
  constructor(
    private resourceSrv: ResourceService,
    private classSrv: ClassService
  ) {}

  public get imageBaseUrl(): string {
    return this.resourceSrv.imageBaseUrl;
  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.pending = true;
    this.classSrv.getClassList({}).subscribe(
      (res) => {
        if (res.count > 0) {
          this.classId = res.results[0].id;
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
      },
      (e) => {
        this.getData();
      }
    );
  }

  onDownload(url: string) {
    window.open(url, '_blank');
  }
}
