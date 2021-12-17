import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'EAP-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.scss'],
})
export class TeacherClassComponent implements OnInit {
  private _classId!: number;
  class!: Class;
  constructor(activatedRoute: ActivatedRoute, private classSrv: ClassService) {
    this._classId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.classSrv.getClassById(this._classId).subscribe((res) => {
      this.class = res;
    });
  }
}
