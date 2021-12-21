import { addDays } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import {
  Asignment,
  ASIGNMENT_STATUS,
  Week,
} from 'src/app/student/model/week.model';
import { ASIGNMENTS_MOCK_DATA } from 'src/app/student/mocks/asignments.mock';

@Component({
  selector: 'EAP-view-weeks',
  templateUrl: './view-weeks.component.html',
  styleUrls: ['./view-weeks.component.scss'],
})
export class ViewWeeksComponent implements OnInit {
  weeks = ASIGNMENTS_MOCK_DATA;
  @Input() class!: Class;
  selectedAsignment?: Asignment;
  tabIndex: number = 0;
  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    let s_date = new Date(this.class.startClassDate);
    let e_date = new Date(this.class.endClassDate);
    let w: Week[] = [];
    while (s_date < e_date) {
      w.push({
        week_id: w.length,
        start_date: s_date,
        end_date: addDays(s_date, 6),
        asignments: [],
      });
      s_date = addDays(s_date, 7);
    }
    this.weeks = w;
  }

  onAddAsignment(week: Week) {
    this.selectedAsignment = {
      id: -1,
      title: '',
      status: ASIGNMENT_STATUS.NOT_SUBMITED,
      left_days: -1,
      short_desc: '',
      expire_date: new Date().toDateString(),
    };
    this.tabIndex = 1;
  }

  showAsignmentDetails(asignment: Asignment) {
    this.selectedAsignment = asignment;
    this.tabIndex = 1;
  }

  getBackFromDetail() {
    this.selectedAsignment = undefined;
    this.tabIndex = 0;
  }
}
