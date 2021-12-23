import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
  imageUrl!: string;

  constructor(
    private dialog: MatDialog,
    private classSrv: ClassService,
    private alertSrv: AlertService,
    private meetSrv: MeetingService,
    private activeRoute: ActivatedRoute
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
    this.checkAndStartEditMode();
  }

  private checkAndStartEditMode() {
    if (this.activeRoute.snapshot.params.id) {
      this.classId = this.activeRoute.snapshot.params.id;
      this.pendding = true;
      this.class_info_form.disable();
      this.classSrv.getClassById(this.classId).subscribe(
        (res) => {
          this.class_info_form.setValue({
            name: res.name,
            grade: +res.grade,
            status: res.status,
            image: res.image,
            startClassDate: res.startClassDate,
            endClassDate: res.endClassDate,
            description: res.description,
          });
          this.scheduleData = res.schedules;
          this.pendding = false;
          this.class_info_form.enable();
        },
        (error) => {
          this.pendding = false;
          this.class_info_form.enable();
        }
      );
    }
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
    if (this.classId)
      this.classSrv.updateClass(this.classId, model).subscribe(
        (response) => {
          this.classId = response.id;
          this.alertSrv.showToaster('Class Updated Successfully!', 'SUCCESS');
          stepper.next();
        },
        (error) => {
          this.class_info_form.enable();
          this.pendding = false;
        },
        () => {
          this.class_info_form.enable();
          this.pendding = false;
        }
      );
    else
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
      grade: new FormControl(1, Validators.required),
      status: new FormControl('ACT'),
      name: new FormControl('', Validators.required),
      image: new FormControl(null),
      description: new FormControl(''),
      endClassDate: new FormControl(new Date(), Validators.required),
      startClassDate: new FormControl(new Date(), Validators.required),
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

  private onCancelEdit() {
    this.editItem = null;
    this.teacher_info_form.reset();
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

  upload(event: any) {
    if (!event[0] || event[0].length == 0) return;
    else if (event[0].type.match(/image\/*/) == null) {
      this.alertSrv.showToaster(
        'please upload a image with right format!',
        'WARNING'
      );
      return;
    } else if (event.length > 1) {
      this.alertSrv.showToaster(
        'please upload just a single image!',
        'WARNING'
      );
      return;
    }
    let form = new FormData();
    form.append('image', event[0]);
    this.classSrv
      .patchClassImage(this.classId, form)
      .subscribe((res: any) => {});
  }

  resetSchedule() {
    this.showWeekSchedule = false;
    this.scheduleData = [];
    this.showWeekSchedule = true;
  }
}
