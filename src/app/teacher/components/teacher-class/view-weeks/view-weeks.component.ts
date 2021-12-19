import { Component, OnInit } from '@angular/core';
import { ASIGNMENTS_MOCK_DATA } from 'src/app/student/mocks/asignments.mock';
import { Asignment } from 'src/app/student/model/week.model';

@Component({
  selector: 'EAP-view-weeks',
  templateUrl: './view-weeks.component.html',
  styleUrls: ['./view-weeks.component.scss'],
})
export class ViewWeeksComponent implements OnInit {
  weeks = ASIGNMENTS_MOCK_DATA;
  selectedAsignment?: Asignment;
  tabIndex: number = 0;
  ngOnInit(): void {}

  showAsignmentDetails(asignment: Asignment) {
    this.selectedAsignment = asignment;
    this.tabIndex = 1;
  }

  getBackFromDetail() {
    this.selectedAsignment = undefined;
    this.tabIndex = 0;
  }
}
