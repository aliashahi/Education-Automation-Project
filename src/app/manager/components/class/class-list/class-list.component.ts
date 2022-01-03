import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Class } from 'src/app/manager/models/class.model';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { CLASS_MOCK_DATA } from 'src/app/manager/mock/class.mock';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';

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
  allData = CLASS_MOCK_DATA;
  filteredData = CLASS_MOCK_DATA;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
        message: 'Are you Sure?',
        submitFn: () => {
          this.allData = this.allData.filter((i) => i.id != item.id);
          this.onFilterAnnouncements();
        },
      },
    });
  }

  private _filter(searched: string, item: Class): boolean {
    return (
      (item.description
        .toLocaleLowerCase()
        .includes((searched || '').toLocaleLowerCase()) ||
        item.title
          .toLocaleLowerCase()
          .includes((searched || '').toLocaleLowerCase()) ||
        item.grade == (!isNaN(+searched) ? 10 : +searched)) &&
      (new Date(item.start_date) >=
        new Date((this.startDate || '').split('-').join('/')) ||
        !this.startDate) &&
      (new Date(item.end_date) <=
        new Date((this.endDate || '').split('-').join('/')) ||
        !this.endDate)
    );
  }
}
