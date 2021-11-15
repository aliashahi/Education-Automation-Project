import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'EAP-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss'],
})
export class WeeklyScheduleComponent implements OnInit {
  week = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  scheduleMap: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.scheduleMap = Array.from({ length: 7 }, (_, i) => {
      return Array.from({ length: 6 }, (_, j) => {
        return { selected: false, i, j };
      });
    });
  }
}
