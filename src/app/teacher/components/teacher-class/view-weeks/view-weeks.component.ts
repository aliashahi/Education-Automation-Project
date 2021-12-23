import {
  addDays,
  differenceInCalendarDays,
  differenceInSeconds,
} from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import { Asignment, Week } from 'src/app/student/model/week.model';
import { ASIGNMENTS_MOCK_DATA } from 'src/app/student/mocks/asignments.mock';
import { AssignmentService } from 'src/app/shared/services/assignment.service';

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

  pending = false;

  constructor(private assignmentSrv: AssignmentService) {}

  ngOnInit(): void {
    this.initData();
  }

  getLeftedDays(deadline: string): string {
    let diff = differenceInCalendarDays(new Date(deadline), new Date());
    return diff > 0 ? diff.toString() : '0';
  }

  private initData() {
    this.pending = true;
    this.assignmentSrv.getAssignments(this.class.id, {}).subscribe(
      (res) => {
        this.pending = false;
        let all_assignments: Asignment[] = res.results;
        let s_date = new Date(this.class.startClassDate);
        let e_date = new Date(this.class.endClassDate);
        let w: Week[] = [];
        let assignments: Asignment[] = [];
        while (s_date < e_date) {
          assignments = [];
          assignments = all_assignments.filter((i) => {
            if (
              differenceInSeconds(new Date(i.deadline), s_date) > 0 &&
              differenceInSeconds(addDays(s_date, 6), new Date(i.deadline)) > 0
            )
              return true;
            else return false;
          });
          w.push({
            week_id: w.length,
            start_date: s_date,
            end_date: addDays(s_date, 6),
            asignments: assignments,
          });
          s_date = addDays(s_date, 7);
        }
        this.weeks = w;
      },
      (e) => (this.pending = false)
    );
  }

  onAddAsignment() {
    this.selectedAsignment = {
      id: -1,
      title: '',
      file: '',
      deadline: '',
    };
    this.tabIndex = 1;
  }

  showAsignmentDetails(asignment: Asignment) {
    this.selectedAsignment = asignment;
    this.tabIndex = 1;
  }

  getBackFromDetail(reload: boolean) {
    this.selectedAsignment = undefined;
    this.tabIndex = 0;
    if (reload) {
      this.ngOnInit();
    }
  }
}
