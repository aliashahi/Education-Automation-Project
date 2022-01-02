import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
//import { SharedAnnService } from '../../services/shared-ann.service';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { MatStartDate } from '@angular/material/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  @ViewChild('addannoun')
  private divAnnoun = {} as ElementRef;

  title: string = '';
  explanation: string = '';
  startDate = new Date();
  time =
    this.startDate.getFullYear +
    '-' +
    this.startDate.getMonth +
    '-' +
    this.startDate.getDay;
  description = '';
  mesage1: string =
    "The notification field can't be empty!... Please enter something.";
  mesage2: string = 'Your notification has been saved';
  isEmpty = true;
  mesage_active = false;

  message: string = '';
  list: any;
  constructor(
    private renderer: Renderer2,
    private annSrv: AnnouncementService,
    // private _userData: SharedAnnService,
    private alertSrv: AlertService
  ) {}

  addText() {
    const text = this.renderer.createText('ya aba abd allah');
    this.renderer.appendChild(this.divAnnoun.nativeElement, text);
  }

  private createAnnouncement(title: string, des: string, startDate: any) {
    this.annSrv
      .createAnnouncements({
        title: title,
        description: des,
        group: 'Stu',
        teachers: [1],
        classes: [1],
        start_date: '2021-12-12',
        expire_date: '2021-12-20',
        has_comment: false,
        allTeachers: false,
        allClasses: false,
        students: [2],
        allStudents: false,
      })
      .subscribe(
        (res) => {},
        (e) => {},
        () => {}
      );
  }
  submited() {
    if (this.description.localeCompare('') == 0) {
      this.mesage2 = '';
      this.mesage1 =
        "The notification field can't be empty!... Please enter something.";
      this.mesage_active = true;
    } else {
      this.isEmpty = false;
      this.mesage1 = '';
      this.changeSuccessMessage();
      //this.mesage2 = "Your notification has been saved";
      this.mesage_active = true;
    }
    setTimeout(() => {
      this.mesage_active = false;
    }, 10000);
    this.createAnnouncement(this.title, this.description, this.startDate);
    //this.addAnnouncement();
  }

  /*
    addAnnouncement(){
      this.list = [
        {name:'Anu',age:'20'}
      ]
      this.list.push({name: this.title, age: this.description});
      this._userData.setUserData(this.list);
    }
    */

  ngOnInit(): void {}

  public changeSuccessMessage() {
    this.alertSrv.showToaster('Saved successfully', 'INFO');
  }
}
