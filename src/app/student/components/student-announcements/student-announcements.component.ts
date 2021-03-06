import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Announcement } from 'src/app/manager/models/announcement.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';

@Component({
  selector: 'EAP-student-announcements',
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.scss'],
})
export class StudentAnnouncementsComponent implements OnInit {
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
      },
      (e) => {
        this.pendding = false;
      },
      () => {
        this.pendding = false;
      }
    );
  }

  onFilterAnnouncements() {
    this.filteredData = this.allData.filter(
      this._filter.bind(this, this.searchedValue)
    );
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
