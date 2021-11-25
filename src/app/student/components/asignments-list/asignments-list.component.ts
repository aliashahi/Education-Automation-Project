import { Component, OnInit } from '@angular/core';
import { ASIGNMENTS_MOCK_DATA } from '../../mocks/asignments.mock';

@Component({
  selector: 'EAP-asignments-list',
  templateUrl: './asignments-list.component.html',
  styleUrls: ['./asignments-list.component.scss'],
})
export class AsignmentsListComponent implements OnInit {
  weeks = ASIGNMENTS_MOCK_DATA;
  constructor() {}

  ngOnInit(): void {}
}
