import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { Meeting, WEEK_DAYS } from '../../constants/schedule.constant';

@Component({
  selector: 'EAP-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  meeting_form!: FormGroup;
  pending: boolean = true;
  data: Meeting[] = [];
  dayOfWeekLabel: any = {};

  displayedColumns: string[] = [
    'dayOfWeek',
    'startTime',
    'endTime',
    'operation',
  ];
  constructor(
    private dialog: MatDialog,
    private alertSrv: AlertService,
    private meetingSrv: MeetingService
  ) {}

  ngOnInit(): void {
    WEEK_DAYS.forEach((i) => {
      this.dayOfWeekLabel[i.value] = i.label;
    });
    this.init_meeting_form();
    this.getData();
  }

  public get getDayOfWeek(): any[] {
    return WEEK_DAYS;
  }

  getData() {
    this.pending = true;
    this.meetingSrv.getMeetings({}).subscribe(
      (res) => {
        this.data = res;
      },
      (e) => {},
      () => {
        this.pending = false;
      }
    );
  }

  onSubmitMetting() {
    this.pending = true;
    this.meetingSrv.createMeeting(this.meeting_form.value).subscribe(
      (res) => {
        console.log(res);
        this.getData();
      },
      (e) => {},
      () => {
        this.pending = false;
      }
    );
  }

  onDelete(meeting: Meeting) {
    this.dialog.open(ConfirmDialog, {
      data: <ConfirmDialogDto>{
        cancelText: 'close',
        submitText: 'delete',
        message: 'Are you Sure?',
        submitFn: () => {
          this.pending = true;
          this.meetingSrv.deleteMeeting(meeting.id).subscribe(
            (res) => {
              this.alertSrv.showToaster(
                'Meeting Deleted Successfully!',
                'SUCCESS'
              );
              this.getData();
            },
            (e) => {},
            () => (this.pending = false)
          );
        },
      },
    });
  }

  private init_meeting_form() {
    this.meeting_form = new FormGroup({
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      dayOfWeek: new FormControl(null, Validators.required),
    });
  }
}
