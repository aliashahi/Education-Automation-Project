import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'EAP-selected-teacher-list',
  templateUrl: './selected-teacher-list.component.html',
  styleUrls: ['./selected-teacher-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedTeacherListComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'field', 'operation'];
  dataSource: any[] = [{ no: 1, name: 'Mr.Jones', field: 'Math' }];
  @Input('dataSource') set setDataSource(value: any[]) {
    if (value) this.dataSource = value;
  }
  @Output() event = new EventEmitter<{ action: ACTION; item: any }>();
  constructor() {}

  ngOnInit(): void {}

  onDelete(item: any) {
    this.event.emit({ action: ACTION.DELETE, item });
  }

  onEdit(item: any) {
    this.event.emit({ action: ACTION.EDIT, item });
  }
}

export enum ACTION {
  EDIT = 'EDIT',
  DELETE = 'DEL',
}
