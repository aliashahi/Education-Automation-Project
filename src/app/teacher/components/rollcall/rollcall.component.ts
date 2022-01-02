import {
  Component,
  HostListener,
  ViewChild,
  OnInit,
  Input,
  TemplateRef,
} from '@angular/core';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { Subject } from 'rxjs';
import { Class } from 'src/app/manager/models/class.model';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { AttendancdService } from 'src/app/shared/services/attendancd.service';
import { ClassService } from 'src/app/shared/services/class.service';
import { UserService } from 'src/app/auth/services/user.service';
import { Attendance } from '../../models/attendance/attendance.module';
import { SharedAnnService } from '../../services/shared-ann.service';

@Component({
  selector: 'EAP-rollcall',
  templateUrl: './rollcall.component.html',
  styleUrls: ['./rollcall.component.scss'],
})
export class RollcallComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private alertSrv: AlertService,
    private attSer: AttendancdService,
    private claSer: ClassService,
    private sharedData: SharedAnnService,
    private useSer: UserService
  ) {
    this.getAttendanceList();
    // this.updateAtt();
  }
  modalRef!: BsModalRef;
  message: string | undefined;

  pendding: boolean = false;
  allData: Class[] = [];
  list: any[] = [];
  presentChecked = true;
  // attendanceList = [{id: "1", session: "2" , student: "3" , present: true }];
  attendanceList: any[] = [];

  time: string = '';
  currentTime = new Date();

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;
  elements: any = [];
  headElements = ['ID', 'Student Name', 'Absent', 'Present'];
  searchText: string = '';
  previous: string | undefined;
  //---------
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  public changeSuccessMessage() {
    this.alertSrv.showToaster('Saved successfully', 'SUCCESS');
  }

  //---------

  openModal(template: TemplateRef<any>) {
    /*
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        */

    for (let i = 0; i < this.attendanceList.length; i++) {
      this.updateAtt(
        this.attendanceList[i].id,
        this.attendanceList[i].session,
        this.attendanceList[i].student,
        this.attendanceList[i].present
      );
    }

    this.changeSuccessMessage();
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.changeSuccessMessage();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.list = this.sharedData.getCreatedAnnoun();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.attendanceList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.attendanceList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  onchange(event: any) {
    const id = event.target.value;
    const isChecked = event.target.checked;
    for (let i = 0; i < this.attendanceList.length; i++) {
      if (this.attendanceList[i].id == id) {
        this.attendanceList[i].present = isChecked;
        this.presentChecked = isChecked;
      }
    }
  }

  onChangeAbsent(event: any) {
    const id = event.target.value;
    const isChecked = event.target.checked;
    for (let i = 0; i < this.attendanceList.length; i++) {
      if (this.attendanceList[i].id == id) {
        if (isChecked == false) {
          this.attendanceList[i].present = !isChecked;
        }
      }
    }
  }

  private getAttendanceList() {
    this.pendding = true;
    this.attSer.getAttendanceListById(1, 2).subscribe(
      (res) => {
        this.attendanceList = res.results;
        this.mdbTable.setDataSource(this.attendanceList);
        this.previous = this.mdbTable.getDataSource();
      },
      (e) => {},
      () => {
        this.pendding = false;
      }
    );
  }

  //id : any, session: any, student: any, present: any
  private updateAtt(id: any, session: any, student: any, present: any) {
    this.pendding = true;
    this.attSer
      .updateAttendance(1, 2, id, {
        id: id,
        session: session,
        student: student,
        present: present,
      })
      .subscribe(
        (response) => {
          this.getAttendanceList();
        },
        (e) => {},
        () => {
          this.pendding = false;
        }
      );
  }
}
