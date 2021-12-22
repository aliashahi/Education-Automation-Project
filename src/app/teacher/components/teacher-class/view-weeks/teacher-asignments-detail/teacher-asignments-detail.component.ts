import {
  differenceInHours,
  differenceInMinutes,
  differenceInCalendarDays,
} from 'date-fns';
import { Asignment } from 'src/app/student/model/week.model';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentService } from 'src/app/shared/services/assignment.service';

@Component({
  selector: 'EAP-teacher-asignments-detail',
  templateUrl: './teacher-asignments-detail.component.html',
  styleUrls: ['./teacher-asignments-detail.component.scss'],
})
export class TeacherAsignmentsDetailComponent implements OnInit {
  @Input() asignment!: Asignment;
  @Input() classId!: number;
  @Output('onBack') _onBack: EventEmitter<boolean> = new EventEmitter();
  diffInDays = '0 Days ,0 Hours ,0 Minutes';
  form!: FormGroup;
  file?: File;
  pending = false;
  constructor(
    private fb: FormBuilder,
    private alertSrv: AlertService,
    private asignmentSrv: AssignmentService
  ) {}

  public get minDeadline(): string {
    let today = new Date();
    let dd: string = today.getDate().toString();
    let mm: string = (today.getMonth() + 1).toString(); //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }
    let res = yyyy + '-' + mm + '-' + dd;
    document.getElementById('datefield')?.setAttribute('min', res);
    return res;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: null,
      deadline: [new Date(), Validators.required],
    });
    this.form.valueChanges.subscribe(this.onFormDataChange.bind(this));
  }

  private onFormDataChange() {
    try {
      let e_date = new Date(this.form.value.deadline);
      let s_date = new Date();
      let day = differenceInCalendarDays(e_date, s_date);
      let hour = differenceInHours(e_date, s_date) % 24;
      let min = differenceInMinutes(e_date, s_date) % 60;
      this.diffInDays = `${day > 0 ? day.toString() + ' Days' : ''} ,${
        hour > 0 ? hour.toString() + ' Hours' : ''
      } ,${min > 0 ? min.toString() + ' Minutes' : ''} `;
    } catch {}
  }

  onSubmit() {
    this.pending = true;
    let formData = new FormData();
    let data = this.form.value;
    formData.append('file', this.file ?? '', this.file?.name);
    formData.append('title', data.title ?? '');
    formData.append('deadline', createDateFormat(data.deadline));
    formData.append('description', data.description ?? '');
    this.asignmentSrv.createAssignment(this.classId, formData).subscribe(
      (res) => {
        this.pending = false;
        this.alertSrv.showToaster('assignment added Successfully!', 'SUCCESS');
        this.onBack(true);
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

  onBack(reload = false) {
    this._onBack.emit(reload);
  }
}
