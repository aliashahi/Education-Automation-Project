import { Component, Output, EventEmitter , OnInit } from '@angular/core';
import {TopnavComponent} from '../../../main/components/topnav/topnav.component'


@Component({
  selector: 'EAP-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.scss']
})
export class TeacherCoursesComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  constructor() {
this.sendMessage();
  }

  ngOnInit(): void {

  }

  sendMessage() {
    this.messageEvent.emit('dsafdsa')
  }
}
