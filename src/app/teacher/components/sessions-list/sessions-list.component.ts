import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendancdService } from 'src/app/shared/services/attendancd.service';
import { ClassService } from 'src/app/shared/services/class.service';
import { Class } from 'src/app/manager/models/class.model';
import { SharedAnnService } from '../../services/shared-ann.service';


@Component({
  selector: 'EAP-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {
  pendding: boolean = false;
  pending = false;
  classId!: number;
  sessionId!: number;
  sharedList: any[] = [];
  sessionList: any[] = [];
  classes: any[] = [];
  TRE_DATA!: { name: string; children: { name: string; }[]; }[];
  constructor(private attSer: AttendancdService,
              private route : Router,
              private sharedData: SharedAnnService,
              private classSrv: ClassService) 
  { 
    this.getData();
    console.log("ya mahdi 1");
    console.log("ya mahdi");
   // this.getSessions(1);
  }


  OnSelectSess(i: any){
    this.route.navigate(['/teacher/roll-call']);
    this.sessionId = this.sessionList[i].id;
    this.setClassSessId();
    console.log(this.sessionId);
  }

  OnSelectClass(i: any){
    this.getSessions(this.classes[i].id);
    this.classId = this.classes[i].id;
    console.log(this.classId);
  }

  ngOnInit(): void {

  }
  private getSessions(id: number) {
    this.pendding = true;
    this.attSer.getSessionsByClassId(id).subscribe(
      (res) => {
        this.sessionList = res.results;
        console.log(res);
      },
      (e) => {},
      () => {
        this.pendding = false;
      }
    );
  }

  private getData() {
    this.pending = true;
    this.classSrv.getClassList({}).subscribe(
      (res) => {
        this.classes = res.results;
        console.log(this.classes);
        this.pending = false;
      },
      (e) => {}
    
    );
  }


  setClassSessId(){
    this.sharedList.push({classId: this.classId, sessionId: this.sessionId});
    this.sharedData.setUserData(this.sharedList);
  }




}
