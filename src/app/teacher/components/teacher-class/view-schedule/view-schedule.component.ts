import {
  Meeting,
  WEEK_DAYS,
} from 'src/app/manager/constants/schedule.constant';
import { Component, Input, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';

@Component({
  selector: 'EAP-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss'],
})
export class ViewScheduleComponent implements OnInit {
  days: string[] = [];
  times: string[] = [];
  scheduleMap: [{ subject?: string; show: boolean }][] = [];
  @Input() scheduleData?: any[] = [];

  constructor(
    private meetingSrv: MeetingService,
    private tokenDecoder: TokenDecoderPipe
  ) {}

  ngOnInit(): void {
    this.scheduleData = this.scheduleData?.filter(
      (i) =>
        i.teacher.user.id ==
        this.tokenDecoder.transform(i.teacher.user.id, 'user_id')
    );

    this.meetingSrv.getMeetings({}).subscribe((res) => {
      this.times = this.extractTimes(res.results);
      this.days = this.extractDaysOfWeek(res.results);
      this.scheduleMap = this.createScheduleMap(res.results);
    });
  }

  private createScheduleMap(res: Meeting[]): any[] {
    return Array.from({ length: this.days.length }, (_, i) => {
      return Array.from({ length: this.times.length }, (_, j) => {
        let schedule: any = (this.scheduleData || []).find((s) =>
          s.times.map((t: any) => t.id).includes(this.getTimeId(res, i, j))
        );
        return {
          subject: !!schedule ? schedule.subject : null,
          show: !!(schedule && schedule.teacher),
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
}
