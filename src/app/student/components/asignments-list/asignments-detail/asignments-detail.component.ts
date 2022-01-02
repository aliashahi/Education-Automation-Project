import { FileDto } from 'src/app/shared/models/file.dto';
import { Asignment } from 'src/app/student/model/week.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ResourceService } from 'src/app/shared/services/resource.service';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-asignments-detail',
  templateUrl: './asignments-detail.component.html',
  styleUrls: ['./asignments-detail.component.scss'],
})
export class AsignmentsDetailComponent implements OnInit {
  @Input() asignment!: Asignment;
  @Input() classId!: number;
  @Output('onBack') _onBack: EventEmitter<void> = new EventEmitter();
  fileToUpload: FileDto[] = [];

  pending: boolean = false;
  constructor(
    private asignmentSrv: AssignmentService,
    private resourceSrv: ResourceService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {}

  public get imageBaseUrl(): string {
    return this.resourceSrv.imageBaseUrl;
  }

  onSubmit() {
    this.pending = true;
    let formData = new FormData();
    formData.append(
      'file',
      this.fileToUpload[0].file ?? '',
      this.fileToUpload[0].name
    );
    this.asignmentSrv
      .submitSubmission(this.classId, this.asignment.id, formData)
      .subscribe(
        (res) => {
          this.pending = false;
          this.alertSrv.showToaster(
            'assignment submitted Successfully!',
            'SUCCESS'
          );
          this.onBack();
        },
        (e) => {
          this.pending = false;
        }
      );
  }

  onDownload(url: string) {
    window.open(url, '_blank');
  }

  onBack() {
    this._onBack.emit();
  }
}
