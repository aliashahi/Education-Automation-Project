import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { SUBJECT_MOCK_DATA } from 'src/app/manager/mock/subject.mock';

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
    // 'Saturday',
    // 'Sunday',
  ];

  scheduleMap: any[] = [];

  techers: User[] = [];
  subjects = SUBJECT_MOCK_DATA;

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.scheduleMap = Array.from({ length: 7 }, (_, i) => {
      return Array.from({ length: 6 }, (_, j) => {
        return { selected: false, i, j };
      });
    });
    this.userSrv.getTeachers({}).subscribe((res) => {
      this.techers = res.map((i: any) => i.user);
    });
  }
}
