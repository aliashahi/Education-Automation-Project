import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/manager/models/user.model';

@Component({
  selector: 'EAP-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss'],
})
export class ViewStudentsComponent implements OnInit {
  @Input() students?: { id: number; profileImage?: string; user: User }[] = [];
  ngOnInit(): void {}
}
