import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { GROUPS } from 'src/app/manager/constants/groups.constant';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/shared/services/class.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
interface SelectDto {
  label: string;
  value: number | string;
}
@Component({
  selector: 'EAP-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss'],
})
export class AnnouncementCreateComponent implements OnInit {
  announcement_form!: FormGroup;
  groups: SelectDto[] = GROUPS;
  teachers: SelectDto[] = [];
  students: SelectDto[] = [];
  classes: SelectDto[] = [];
  pendding: boolean = false;
  constructor(
    private router: Router,
    private userSrv: UserService,
    private classSrv: ClassService,
    private alertService: AlertService,
    private annSrv: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.initAnnouncementForm();
    this.userSrv.getTeachers({}).subscribe((res) => {
      this.teachers = res.map((i: any) => {
        return {
          value: i.user.id,
          label: i.user.first_name + ' ' + i.user.last_name,
        };
      });
    });
    this.userSrv.getStudents({}).subscribe((res) => {
      this.students = res.map((i: any) => {
        return {
          value: i.user.id,
          label: i.user.first_name + ' ' + i.user.last_name,
        };
      });
    });
    this.classSrv.getClassList({}).subscribe((res) => {
      this.classes = res.map((i: any) => {
        return {
          label: i.name,
          value: i.id,
        };
      });
    });
  }

  private initAnnouncementForm() {
    this.announcement_form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      group: new FormControl(null, Validators.required),
      start_date: new FormControl(new Date(), Validators.required),
      expire_date: new FormControl(new Date(), Validators.required),
      allTeachers: new FormControl(false),
      teachers: new FormControl([]),
      allStudents: new FormControl(false),
      students: new FormControl([]),
      allClasses: new FormControl(false),
      classes: new FormControl([]),
    });
  }

  onSubmit() {
    this.pendding = true;
    this.announcement_form.disable();
    this.annSrv
      .createAnnouncements({
        ...this.announcement_form.value,
        start_date: createDateFormat(this.announcement_form.value.start_date),
        expire_date: createDateFormat(this.announcement_form.value.expire_date),
      })
      .subscribe(
        (res) => {
          this.alertService.showToaster('Announcement Created!!!', 'SUCCESS');
          setTimeout(() => {
            this.router.navigate(['/manager/announcement-list']);
          }, 1000);
        },
        (e) => {},
        () => {
          this.pendding = true;
          this.announcement_form.enable();
        }
      );
  }
}
