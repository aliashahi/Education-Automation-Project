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
  pending: boolean = false;
  file?: File;
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
    formData.append('file', this.file ?? '', this.file?.name);
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

  upload(event: any, type = 1) {
    if (this.pending) return;
    if (type == 2) event = event.target.files;
    if (!event[0] || event[0].length == 0) return;
    this.file = event[0];
  }

  onDownload(url: string) {
    window.open(url, '_blank');
  }

  onBack() {
    this._onBack.emit();
  }
}
