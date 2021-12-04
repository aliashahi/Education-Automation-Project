import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Class } from 'src/app/manager/models/class.model';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { ClassService } from 'src/app/shared/services/class.service';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  showKind: 'list' | 'grid' = 'list';
  searchedValue!: string;
  startDate!: string;
  endDate!: string;
  allData: Class[] = [];
  filteredData: Class[] = [];
  constructor(
    private dialog: MatDialog,
    private classSrv: ClassService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.classSrv.getClassList({}).subscribe((response: Class[]) => {
      this.allData = response;
      this.onFilterAnnouncements();
    });
  }

  onFilterAnnouncements() {
    this.filteredData = this.allData.filter(
      this._filter.bind(this, this.searchedValue)
    );
  }

  onEdit(item: Class) {}

  onDelete(item: Class) {
    this.dialog.open(ConfirmDialog, {
      data: <ConfirmDialogDto>{
        cancelText: 'close',
        submitText: 'delete',
        message: 'Are you Sure ?',
        submitFn: () => {
          this.classSrv.deleteClass(item.id).subscribe((response) => {
            this.alertSrv.showToaster('Class deleted Successfully!', 'SUCCESS');
            this.getData();
          });
        },
      },
    });
  }

  private _filter(searched: string, item: Class): boolean {
    return (
      item.description
        .toLocaleLowerCase()
        .includes((searched || '').toLocaleLowerCase()) ||
      item.name
        .toLocaleLowerCase()
        .includes((searched || '').toLocaleLowerCase()) ||
      (item.grade.includes(searched) &&
        (new Date(item.startClassDate) >=
          new Date((this.startDate || '').split('-').join('/')) ||
          !this.startDate) &&
        (new Date(item.endClassDate) <=
          new Date((this.endDate || '').split('-').join('/')) ||
          !this.endDate))
    );
  }
}
