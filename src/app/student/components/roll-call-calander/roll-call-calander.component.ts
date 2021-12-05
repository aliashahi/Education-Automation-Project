import { Component, OnInit } from '@angular/core';
import { RollCallCalanderMonth } from '../../model/roll-call.model';

@Component({
  selector: 'EAP-roll-call-calander',
  templateUrl: './roll-call-calander.component.html',
  styleUrls: ['./roll-call-calander.component.scss'],
})
export class RollCallCalanderComponent implements OnInit {
  rollCallMonths: RollCallCalanderMonth[] = [];
  week = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  allEvents = [
    'you have Quiz!',
    'you have Exam!',
    'you have Meetings!',
    'you have Site-seeing!',
    'you have deadLine!',
  ];

  constructor() {}

  ngOnInit(): void {
    this.rollCallMonths = this._createMockDate();
  }

  private _createMockDate(): RollCallCalanderMonth[] {
    return Array.from({ length: 12 }, (v, i) => {
      let today = new Date();
      let year = today.getFullYear();
      today = new Date(year, i + 1, 1);
      let month = today.getMonth();
      let day = today.getDay();
      let monthTitle = this.monthNames[month];
      let start_days = Array.from({ length: day }, (_, i) => {
        return {
          dayNumber: null,
          wasAbsent: null,
          events: [],
        };
      });
      return {
        year,
        month,
        monthTitle,
        days: [
          ...start_days,
          ...Array.from({ length: 30 }, (v, day) => {
            return {
              dayNumber: day + 1,
              wasAbsent:
                Math.floor(Math.random() * 100) % 10 == 1 ? true : false,
              events: [
                ...this.allEvents.slice(0, Math.floor(Math.random() * 100) % 4),
              ],
            };
          }),
        ],
      };
    });
  }
}
