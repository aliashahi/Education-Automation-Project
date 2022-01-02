import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedAnnService } from '../../services/shared-ann.service';

@Component({
  selector: 'EAP-teacher-announcement-list',
  templateUrl: './teacher-announcement-list.component.html',
  styleUrls: ['./teacher-announcement-list.component.scss'],
})
export class TeacherAnnouncementListComponent implements OnInit {
  @ViewChild('addannoun')
  private divAnnoun = {} as ElementRef;
  message: string = '';
  title: string = '';
  announcement: string = '';

  list!: any[];
  // showList : boolean;

  editField: string | undefined;
  personList: Array<any> = [
    { id: 1, tit: 'Aurelia Vega', ann: 30 },
    { id: 2, tit: 'Guerra Cortez', ann: 45 },
    { id: 3, tit: 'Guadalupe House', ann: 26 },
    { id: 4, tit: 'Aurelia Vega', ann: 30 },
    { id: 5, tit: 'Elisa Gallagher', ann: 31 },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, tit: 'George Vega', ann: 28 },
    { id: 7, tit: 'Mike Low', ann: 22 },
    { id: 8, tit: 'John Derp', ann: 36 },
    { id: 9, tit: 'Anastasia John', ann: 21 },
    { id: 10, tit: 'John Maklowicz', ann: 36 },
  ];

  constructor(
    private route: Router,
    private renderer: Renderer2,
    private _userData: SharedAnnService
  ) {}
  fetchDataFromService() {
    // this.showList = true;
    //this.list = this._userData.getUserData();
    // this.title = this.list[0].name;
    // this.personList.push({id: 11, tit: this.list[0].name, ann: 24});
  }

  addText() {
    const text = this.renderer.createText('ya aba abd allah');
    this.renderer.appendChild(this.divAnnoun.nativeElement, text);
  }

  clickme() {
    this.route.navigate(['/teacher/roll-call']);
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  ngOnInit(): void {
    this.list = [];
    if (this.list)
      this.personList.push({ id: 11, tit: this.list[1].name, ann: 24 });
  }
}
