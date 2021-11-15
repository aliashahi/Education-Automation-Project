import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { Pagination } from 'src/app/manager/models/pagination.model';
import { User } from 'src/app/manager/models/user.model';
import { FieldConfig } from 'src/app/shared/modules/form-builder';

@Component({
  selector: 'EAP-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'role',
    'username',
    'email',
    'operation',
  ];
  panelOpenState = true;
  dataSource = USER_MOCK_DATA;
  filterConfigs!: FieldConfig[];
  filterForm!: FormGroup;
  pagination: Pagination = {
    length: 800,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 40, 80, 160],
  };
  constructor() {}

  ngOnInit(): void {
    this.initFilterForm();
    this.getData();
  }

  private getData(
    model: Partial<{ pageSize: number; pageIndex: number }> = {
      pageIndex: 0,
      pageSize: 10,
    }
  ) {
    if (!model.pageIndex) model.pageIndex = 0;
    if (!model.pageSize) model.pageSize = 10;
    this.dataSource = USER_MOCK_DATA.slice(
      model.pageSize * model.pageIndex,
      model.pageSize * (model.pageIndex + 1)
    );
  }

  onPaginationChange($event: PageEvent) {
    this.pagination = { ...this.pagination, ...$event };
    this.getData({ ...$event });
  }

  onDelete(user: User) {}

  onInfo(user: User) {}

  private initFilterForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      id: new FormControl(null),
      role: new FormControl(null),
    });
    this.filterConfigs = [
      {
        id: 'name',
        label: 'Name',
        class: 'w-1/2',
      },
      {
        id: 'id',
        label: 'No.',
        class: 'w-1/2',
      },
      {
        id: 'role',
        label: 'Role',
        class: 'w-1/2',
      },
    ];
  }
}
