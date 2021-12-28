import {
  addDays,
  differenceInSeconds,
  differenceInCalendarDays,
} from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { Asignment, Week } from '../../model/week.model';
import { Class } from 'src/app/manager/models/class.model';
import { ASIGNMENTS_MOCK_DATA } from '../../mocks/asignments.mock';
import { ClassService } from 'src/app/shared/services/class.service';
import { AssignmentService } from 'src/app/shared/services/assignment.service';

@Component({
  selector: 'EAP-asignments-list',
  templateUrl: './asignments-list.component.html',
  styleUrls: ['./asignments-list.component.scss'],
})
export class AsignmentsListComponent implements OnInit {
  weeks = ASIGNMENTS_MOCK_DATA;
  selectedAsignment?: Asignment;
  tabIndex: number = 0;
  pending: boolean = false;
  class!: Class;

  constructor(
    private assignmentSrv: AssignmentService,
    private classSrv: ClassService
  ) {}

  ngOnInit(): void {
    this.pending = true;
    this.classSrv.getClassList({}).subscribe(
      (res) => {
        if (res.count > 0) {
          this.class = res.results[0];
          this.initData();
        }
      },
      (e) => {}
    );
  }

  getLeftedDays(deadline: string): string {
    let diff = differenceInCalendarDays(new Date(deadline), new Date());
    return diff.toString();
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
              differenceInSeconds(new Date(i.deadline), s_date) >= 0 &&
              differenceInSeconds(addDays(s_date, 6), new Date(i.deadline)) >= 0
            )
              return true;
            else return false;
          });
          all_assignments = all_assignments.filter(
            (i) => !assignments.map((a) => a.id).includes(i.id)
          );
          w.push({
            week_id: w.length,
            start_date: s_date,
            end_date: addDays(s_date, 6),
            asignments: assignments,
          });
          s_date = addDays(s_date, 7);
        }
        if (all_assignments.length > 0 && w.length > 0) {
          w[0] = {
            ...w[0],
            asignments: [...all_assignments, ...w[0].asignments],
          };
        }
        this.weeks = w;
      },
      (e) => (this.pending = false)
    );
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
