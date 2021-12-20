import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/manager/models/user.model';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { UserSearchDto } from 'src/app/auth/services/user.dto';
import { UserService } from 'src/app/auth/services/user.service';
import { Pagination } from 'src/app/manager/models/pagination.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';
import { Observable } from 'rxjs';
interface LocalUserSearchDto {
  name?: string;
  username?: string;
  email?: string;
}

@Component({
  selector: 'EAP-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  pendding: boolean = false;
  searchModel: LocalUserSearchDto = {};

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
  filterForm!: FormGroup;
  pagination: Pagination = {
    length: 800,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 40, 80, 160],
  };
  constructor(
    private userSrv: UserService,
    private dialog: MatDialog,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(role = 'S') {
    this.pendding = true;
    let subject!: Observable<any>;
    switch (role) {
      case 'M':
        subject = this.userSrv.getManagers(this.searchModel);
        break;
      case 'T':
        subject = this.userSrv.getTeachers(this.searchModel);
        break;
      default:
        subject = this.userSrv.getStudents(this.searchModel);
        break;
    }
    subject.subscribe(
      (res) => {
        this.allData = res.results.map((i: any) => i.user);
        this.onFilterUsers();
      },
      () => {},
      () => (this.pendding = false)
    );
  }

  onChangeUserRole(role: 'S' | 'T' | 'M' | undefined) {
    if (role) this.getData(role);
  }

  onPaginationChange($event: PageEvent) {
    this.pagination = { ...this.pagination, ...$event };
    this.getData();
  }

  onFilterUsers() {
    this.filteredData = this.allData.filter((user) => {
      return (
        user.first_name
          ?.toLowerCase()
          .includes((this.searchModel.name || '').toLowerCase()) &&
        user.last_name
          ?.toLowerCase()
          .includes((this.searchModel.name || '').toLowerCase()) &&
        user.username
          ?.toLowerCase()
          .includes((this.searchModel.username || '').toLowerCase()) &&
        user.email
          ?.toLowerCase()
          .includes((this.searchModel.email || '').toLowerCase())
      );
    });
    if (!this.pagination.pageIndex) this.pagination.pageIndex = 0;
    if (!this.pagination.pageSize) this.pagination.pageSize = 10;
    this.dataSource = this.filteredData.slice(
      this.pagination.pageSize * this.pagination.pageIndex,
      this.pagination.pageSize * (this.pagination.pageIndex + 1)
    );
  }

  onDelete(user: User) {
    this.dialog.open(ConfirmDialog, {
      data: <ConfirmDialogDto>{
        cancelText: 'close',
        submitText: 'delete',
        message: 'Are you Sure?',
        submitFn: () => {
          this.pendding = true;
          this.userSrv.deleteUser(user.id).subscribe(
            (res) => {
              this.alertSrv.showToaster(
                'User Deleted Successfully!',
                'SUCCESS'
              );
              this.getData();
            },
            (e) => {},
            () => (this.pendding = false)
          );
        },
      },
    });
  }

  onInfo(user: User) {}
}
