import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import { Asignment } from 'src/app/student/model/week.model';

@Component({
  selector: 'EAP-teacher-asignments-detail',
  templateUrl: './teacher-asignments-detail.component.html',
  styleUrls: ['./teacher-asignments-detail.component.scss'],
})
export class TeacherAsignmentsDetailComponent implements OnInit {
  @Input() asignment!: Asignment;
  @Output('onBack') _onBack: EventEmitter<void> = new EventEmitter();
  diffInDays = '0 Days ,0 Hours ,0 Minutes';
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required],
    });
    this.form.valueChanges.subscribe(this.onFormDataChange.bind(this));
  }

  private onFormDataChange() {
    try {
      let e_date = new Date(this.form.value.end_date);
      let s_date = new Date(this.form.value.start_date);
      let day = differenceInCalendarDays(e_date, s_date);
      let hour = differenceInHours(e_date, s_date) % 24;
      let min = differenceInMinutes(e_date, s_date) % 60;
      this.diffInDays = `${day > 0 ? day.toString() + ' Days' : ''} ,${
        hour > 0 ? hour.toString() + ' Hours' : ''
      } ,${min > 0 ? min.toString() + ' Minutes' : ''} `;
    } catch {}
  }

  onBack() {
    this._onBack.emit();
  }
}
