import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/manager/models/user.model';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { FieldConfig } from 'src/app/shared/modules/form-builder';
import { Pagination } from 'src/app/manager/models/pagination.model';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'EAP-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchModel: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
  } = {};

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
  allData = USER_MOCK_DATA;
  filteredData = USER_MOCK_DATA;
  dataSource: User[] = [];
  filterConfigs!: FieldConfig[];
  filterForm!: FormGroup;
  pagination: Pagination = {
    length: 800,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 40, 80, 160],
  };
  constructor(private userSrv: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
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
    this.dataSource = this.filteredData.slice(
      model.pageSize * model.pageIndex,
      model.pageSize * (model.pageIndex + 1)
    );
  }

  onPaginationChange($event: PageEvent) {
    this.pagination = { ...this.pagination, ...$event };
    this.getData({ ...$event });
  }

  onFilterUsers() {
    this.filteredData = this.allData.filter((user) => {
      return (
        user.first_name
          ?.toLowerCase()
          .includes((this.searchModel.first_name || '').toLowerCase()) &&
        user.last_name
          ?.toLowerCase()
          .includes((this.searchModel.last_name || '').toLowerCase()) &&
        user.username
          ?.toLowerCase()
          .includes((this.searchModel.username || '').toLowerCase()) &&
        user.email
          ?.toLowerCase()
          .includes((this.searchModel.email || '').toLowerCase())
      );
    });
    this.onPaginationChange(this.pagination);
  }

  onDelete(user: User) {
    this.dialog.open(ConfirmDialog, {
      data: <ConfirmDialogDto>{
        cancelText: 'close',
        submitText: 'delete',
        message: 'Are you Sure?',
        submitFn: () => {
          this.allData = this.allData.filter((i) => i.id != user.id);
          this.onFilterUsers();
        },
      },
    });
  }

  onInfo(user: User) {}
}
