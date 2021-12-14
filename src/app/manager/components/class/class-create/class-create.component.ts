import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/manager/models/user.model';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { GRADES } from 'src/app/manager/constants/grades.constant';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/shared/services/class.service';
import { CLASS_STATUS } from 'src/app/manager/constants/status.constant';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ScheduleDataDto } from 'src/app/manager/models/schedule-data.dto';
import { ACTION } from './selected-teacher-list/selected-teacher-list.component';
import { DefineMeetingsDialog } from './weekly-schedule/define-meetings-dialog/define-meetings.dialog';

@Component({
  selector: 'EAP-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss'],
})
export class ClassCreateComponent implements OnInit {
  class_info_form!: FormGroup;
  teacher_info_form!: FormGroup;
  student_info_form!: FormGroup;
  isEditable = true;
  options: User[] = [];
  filteredOptions!: Observable<User[]>;
  teachers: User[] = [];
  students: User[] = [];
  editItem!: any;
  pendding: boolean = false;
  showWeekSchedule: boolean = true;
  scheduleData: ScheduleDataDto[] = [];
  classId: number = 0;

  constructor(
    private dialog: MatDialog,
    private classSrv: ClassService,
    private alertSrv: AlertService,
    private meetSrv: MeetingService
  ) {}

  public get getClassStatus(): {
    label: string;
    value: string;
  }[] {
    return CLASS_STATUS;
  }

  public get getClassGrades(): {
    label: string;
    value: number;
  }[] {
    return GRADES;
  }

  ngOnInit() {
    this.initClassInfoForm();
    this.options = USER_MOCK_DATA;

    this.initTeacherSelectForm();
    this.initStudentSelectForm();
  }

  onSubmitBaseInfo(stepper: MatStepper) {
    let model = {
      ...this.class_info_form.value,
      startClassDate: createDateFormat(
        this.class_info_form.value.startClassDate as Date
      ),
      endClassDate: createDateFormat(
        this.class_info_form.value.endClassDate as Date
      ),
    };
    this.pendding = true;
    this.class_info_form.disable();
    this.classSrv.createClass(model).subscribe(
      (response) => {
        this.classId = response.id;
        this.alertSrv.showToaster('Class Created Successfully!', 'SUCCESS');
        stepper.next();
      },
      (error) => {},
      () => {
        this.class_info_form.enable();
        this.pendding = false;
      }
    );
  }

  private initClassInfoForm() {
    this.class_info_form = new FormGroup({
      name: new FormControl('Grade A/1', Validators.required),
      grade: new FormControl(1, Validators.required),
      status: new FormControl('ACT', Validators.required),
      startClassDate: new FormControl(new Date(), Validators.required),
      endClassDate: new FormControl(new Date(), Validators.required),
      description: new FormControl('no desc', Validators.required),
    });
  }

  private initTeacherSelectForm() {
    this.teacher_info_form = new FormGroup({
      name: new FormControl(null),
    });
  }

  private initStudentSelectForm() {
    this.student_info_form = new FormGroup({
      name: new FormControl(null),
    });
  }

  onCancelEdit() {
    this.editItem = null;
    this.teacher_info_form.reset();
  }

  onInsertTeacher() {
    if (this.editItem) {
      this.teachers = this.teachers.map((i, index) => {
        if (this.editItem.id == i.id) {
          return {
            ...i,
            ...this.teacher_info_form.value.name,
          };
        } else
          return {
            ...i,
            no: index + 1,
          };
      });
      this.editItem = null;
    } else {
      this.teachers = [
        ...this.teachers,
        {
          ...this.teacher_info_form.value.name,
        },
      ];
    }
    this.teacher_info_form.reset();
  }

  onEvent(event: { action: ACTION; item: any }) {
    switch (event.action) {
      case ACTION.DELETE:
        this.teachers = this.teachers.filter((i) => i.id != event.item.id);
        break;
      case ACTION.EDIT:
        let teacher = this.teachers.find((i) => i.id == event.item.id);
        this.teacher_info_form.get('name')?.setValue(teacher);
        this.editItem = teacher;
        break;
    }
  }

  onSubmitSchedule(stepper: MatStepper) {
    this.pendding = true;
    let pendingCount = 0;
    this.updateSchedule(
      { ...this.scheduleData[pendingCount] },
      pendingCount,
      stepper
    );
  }

  private updateSchedule(
    data: ScheduleDataDto,
    pendingCount: number,
    stepper: MatStepper
  ) {
    this.meetSrv.updateClassSchedue(data).subscribe(
      (res) => {
        if (pendingCount != this.scheduleData.length - 1) {
          pendingCount++;
          this.updateSchedule(
            this.scheduleData[pendingCount],
            pendingCount,
            stepper
          );
        }
      },
      (e) => {},
      () => {
        if (pendingCount == this.scheduleData.length - 1) {
          this.alertSrv.showToaster(
            'Schedules Successfully Updated!',
            'SUCCESS'
          );
          stepper.next();
          this.pendding = false;
        }
      }
    );
  }

  openDefineMeetingDialog() {
    this.showWeekSchedule = false;
    this.dialog
      .open(DefineMeetingsDialog, {
        width: '90vw',
      })
      .afterClosed()
      .subscribe((_) => {
        this.showWeekSchedule = true;
      });
  }

  resetSchedule() {
    this.showWeekSchedule = false;
    this.scheduleData = [];
    this.showWeekSchedule = true;
  }
}
