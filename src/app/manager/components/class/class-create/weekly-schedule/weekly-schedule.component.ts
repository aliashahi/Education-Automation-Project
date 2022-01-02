import {
  Meeting,
  WEEK_DAYS,
} from 'src/app/manager/constants/schedule.constant';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { SUBJECT_MOCK_DATA } from 'src/app/manager/mock/subject.mock';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { ScheduleDataDto } from 'src/app/manager/models/schedule-data.dto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss'],
})
export class WeeklyScheduleComponent implements OnInit {
  days: string[] = [];
  times: string[] = [];
  scheduleMap: any[] = [];

  techers: User[] = [];
  subjects = SUBJECT_MOCK_DATA;
  @Input() classId: number = 0;
  @Input() scheduleData: ScheduleDataDto[] = [];
  @Output() scheduleDataChange = new EventEmitter<ScheduleDataDto[]>();

  constructor(
    private userSrv: UserService,
    private meetingSrv: MeetingService
  ) {}

  ngOnInit(): void {
    this.meetingSrv.getMeetings({}).subscribe((res) => {
      this.times = this.extractTimes(res.results);
      this.days = this.extractDaysOfWeek(res.results);
      this.scheduleMap = this.createScheduleMap(res.results);
    });
    this.userSrv.getTeachers({}).subscribe((res) => {
      this.techers = res.results.map((i: any) => {
        return { ...i.user, id: i.id };
      });
    });
  }

  private createScheduleMap(res: Meeting[]): any[] {
    return Array.from({ length: this.days.length }, (_, i) => {
      return Array.from({ length: this.times.length }, (_, j) => {
        let schedule: any = this.scheduleData.find((s) =>
          s.times.map((t: any) => t.id).includes(this.getTimeId(res, i, j))
        );
        return {
          selected: false,
          i,
          j,
          teacher: schedule && schedule.teacher ? schedule.teacher.id : null,
          subject: schedule ? schedule.subject : null,
          timeId: this.getTimeId(res, i, j),
          isEnable: this.checkIsEnable(res, i, j),
        };
      });
    });
  }

  private getTimeId(res: Meeting[], i: number, j: number): number {
    let item = res.find(
      (meet) =>
        meet.dayOfWeek == this.days[i] &&
        this.getTimeRightFormat(meet) == this.times[j]
    );
    if (!!item) return item.id;
    else return 0;
  }

  private checkIsEnable(res: Meeting[], i: number, j: number): boolean {
    return !!res.find(
      (meet) =>
        meet.dayOfWeek == this.days[i] &&
        this.getTimeRightFormat(meet) == this.times[j]
    );
  }

  private extractTimes(res: any) {
    let times: string[] = [];
    res.forEach((i: Meeting) => {
      if (!times.includes(this.getTimeRightFormat(i)))
        times.push(this.getTimeRightFormat(i));
    });
    times = times.sort((a, b) => {
      a = a.split(' ')[0];
      b = b.split(' ')[0];
      let hour1 = +a.split(':')[0];
      let hour2 = +b.split(':')[0];
      let min1 = +a.split(':')[1];
      let min2 = +b.split(':')[1];
      if (hour1 > hour2) return 1;
      else if (hour1 < hour2) return -1;
      else {
        if (min1 > min2) return 1;
        else if (min1 < min2) return -1;
        else return 0;
      }
    });
    return times;
  }

  private getTimeRightFormat(m: Meeting): string {
    return (
      m.startTime.split(':').slice(0, 2).join(':') +
      ' to ' +
      m.endTime.split(':').slice(0, 2).join(':')
    );
  }

  private extractDaysOfWeek(res: Meeting[]): string[] {
    let days: string[] = [];
    res.forEach((i: Meeting) => {
      if (!days.includes(i.dayOfWeek)) days.push(i.dayOfWeek);
    });
    days = days.sort((a, b) => {
      if (
        WEEK_DAYS.find((i) => i.value == a) == undefined ||
        WEEK_DAYS.find((i) => i.value == b) == undefined
      )
        return 0;
      else if (
        (WEEK_DAYS.find((i) => i.value == a)?.value ?? 0) >
        (WEEK_DAYS.find((i) => i.value == b)?.value ?? 0)
      )
        return 1;
      else return -1;
    });
    return days;
  }

  onChangeValue() {
    setTimeout(() => {
      let schedules: any[] = [];
      this.scheduleMap.map((i) => {
        let validItems = i.filter(
          (i: any) => i.isEnable && i.teacher && i.subject
        );
        schedules.push(...validItems);
        return validItems;
      });
      schedules = schedules.map((i: any) => {
        return {
          classroom: this.classId,
          subject: i.subject,
          teacher: i.teacher,
          times: [i.timeId],
        };
      });
      let commonOut: ScheduleDataDto[] = [];
      schedules.forEach((item) => {
        if (
          !!commonOut.find(
            (i) => i.subject == item.subject && i.teacher == item.teacher
          )
        ) {
          commonOut
            .find((i) => i.subject == item.subject && i.teacher == item.teacher)
            ?.times.push(item.times[0]);
        } else commonOut.push(item);
      });
      this.scheduleData = schedules;
      this.scheduleDataChange.emit(this.scheduleData);
    }, 0);
  }
}
