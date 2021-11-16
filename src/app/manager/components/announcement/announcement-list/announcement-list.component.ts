import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ANNOUNCEMENT_MOCK_DATA } from 'src/app/manager/mock/announcement.mock';
import { Announcement } from 'src/app/manager/models/announcement.model';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';

@Component({
  selector: 'EAP-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss'],
})
export class AnnouncementListComponent implements OnInit {
  showKind: 'list' | 'grid' = 'list';
  searchedValue!: string;
  startDate!: string;
  endDate!: string;
  allData = ANNOUNCEMENT_MOCK_DATA;
  filteredData = ANNOUNCEMENT_MOCK_DATA;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onFilterAnnouncements() {
    this.filteredData = this.allData.filter(
      this._filter.bind(this, this.searchedValue)
    );
  }

  onEdit(item: Announcement) {}

  onDelete(item: Announcement) {
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

  private _filter(searched: string, item: Announcement): boolean {
    return (
      (item.description
        .toLocaleLowerCase()
        .includes((searched || '').toLocaleLowerCase()) ||
        item.title
          .toLocaleLowerCase()
          .includes((searched || '').toLocaleLowerCase()) ||
        item.subtitle
          .toLocaleLowerCase()
          .includes((searched || '').toLocaleLowerCase())) &&
      (new Date(item.date) >=
        new Date((this.startDate || '').split('-').join('/')) ||
        !this.startDate) &&
      (new Date(item.date) <=
        new Date((this.endDate || '').split('-').join('/')) ||
        !this.endDate)
    );
  }
}
