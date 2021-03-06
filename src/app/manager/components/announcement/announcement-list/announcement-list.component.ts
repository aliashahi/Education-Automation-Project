import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared/modules/confirm';
import { Announcement } from 'src/app/manager/models/announcement.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';
import { AnnouncementDetailDialog } from './announcement-detail/announcement-detail.component';

@Component({
  selector: 'EAP-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss'],
})
export class AnnouncementListComponent implements OnInit {
  showKind: 'list' | 'grid' = 'grid';
  searchedValue!: string;
  startDate!: string;
  endDate!: string;
  allData: Announcement[] = [];
  filteredData: Announcement[] = [];
  pendding: boolean = false;
  constructor(
    private dialog: MatDialog,
    private alertSrv: AlertService,
    private annSrv: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.pendding = true;
    this.annSrv.getAnnouncements({}).subscribe(
      (res) => {
        this.allData = res;
        this.onFilterAnnouncements();
        this.pendding = false;
      },
      (e) => {
        this.pendding = false;
      }
    );
  }

  onFilterAnnouncements() {
    this.filteredData = this.allData.filter(
      this._filter.bind(this, this.searchedValue)
    );
  }

  openMoreDialog(item: Announcement) {
    this.dialog.open(AnnouncementDetailDialog, {
      data: item,
    });
  }

  onDelete(item: Announcement) {
    this.dialog.open(ConfirmDialog, {
      data: <ConfirmDialogDto>{
        cancelText: 'close',
        submitText: 'delete',
        message: 'Are you Sure?',
        submitFn: () => {
          this.pendding = true;
          this.annSrv.deleteAnnouncements(item.id).subscribe(
            (res) => {
              this.alertSrv.showToaster(
                'Announcement Deleted Successfully!',
                'SUCCESS'
              );
              this.pendding = false;
              this.getData();
            },
            (e) => {
              this.pendding = false;
            },
            () => {}
          );
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
        item.title
          .toLocaleLowerCase()
          .includes((searched || '').toLocaleLowerCase())) &&
      (new Date(item.expire_date ?? '') >=
        new Date((this.startDate || '').split('-').join('/')) ||
        !this.startDate) &&
      (new Date(item.expire_date ?? '') <=
        new Date((this.endDate || '').split('-').join('/')) ||
        !this.endDate)
    );
  }
}
