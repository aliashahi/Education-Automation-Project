import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from 'src/app/manager/models/user.model';

@Component({
  selector: 'EAP-selected-teacher-list',
  templateUrl: './selected-teacher-list.component.html',
  styleUrls: ['./selected-teacher-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedTeacherListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'last_name',
    'first_name',
    'role',
    'gender',
    'email',
    'operation'
  ];
  dataSource: User[] = [];
  @Input('dataSource') set setDataSource(value: User[]) {
    if (value) this.dataSource = value;
  }
  @Output() event = new EventEmitter<{ action: ACTION; item: User }>();
  constructor() {}

  ngOnInit(): void {}

  onDelete(item: User) {
    this.event.emit({ action: ACTION.DELETE, item });
  }

  onEdit(item: User) {
    this.event.emit({ action: ACTION.EDIT, item });
  }
}

export enum ACTION {
  EDIT = 'EDIT',
  DELETE = 'DEL',
}
