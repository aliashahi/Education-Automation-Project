import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asignment } from 'src/app/student/model/week.model';

@Component({
  selector: 'EAP-teacher-asignments-detail',
  templateUrl: './teacher-asignments-detail.component.html',
  styleUrls: ['./teacher-asignments-detail.component.scss'],
})
export class TeacherAsignmentsDetailComponent implements OnInit {
  @Input() asignment!: Asignment;
  @Output('onBack') _onBack: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onBack() {
    this._onBack.emit();
  }
}
