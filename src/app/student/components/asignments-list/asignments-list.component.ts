import { Component, OnInit } from '@angular/core';
import { ASIGNMENTS_MOCK_DATA } from '../../mocks/asignments.mock';
import { Asignment } from '../../model/week.model';

@Component({
  selector: 'EAP-asignments-list',
  templateUrl: './asignments-list.component.html',
  styleUrls: ['./asignments-list.component.scss'],
})
export class AsignmentsListComponent implements OnInit {
  weeks = ASIGNMENTS_MOCK_DATA;
  selectedAsignment?: Asignment;
  tabIndex: number = 0;

  constructor() {}

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
