import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/manager/models/announcement.model';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';

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

  constructor(private annSrv: AnnouncementService) {
    this.getData();
  }

  ngOnInit(): void {}

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    //this.personList[id][property] = editField;
  }

  remove(i: any) {
    this.deleteAnnouncement(this.allData[i].id);
  }

  changeValue(id: number, property: string, event: any) {
    // this.editField = event.target.textContent;
  }

  /*---------------------------------*/
  private getData() {
    this.pendding = true;
    this.annSrv.getAnnouncements({}).subscribe(
      (res) => {
        this.allData = res;
        this.onFilterAnnouncements();
      },
      (e) => {},
      () => {
        this.pendding = false;
      }
    );
  }

  private deleteAnnouncement(id: any) {
    this.pendding = true;
    this.annSrv.deleteAnnouncements(id).subscribe(
      (res) => {
        this.getData();
      },
      (e) => {},
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
          .includes((searched || '').toLocaleLowerCase())) &&
      (new Date(item.start_date ?? '') >=
        new Date((this.startDate || '').split('-').join('/')) ||
        !this.startDate) &&
      (new Date(item.start_date ?? '') <=
        new Date((this.endDate || '').split('-').join('/')) ||
        !this.endDate)
    );
  }
  /*------------------------------------------*/
}
