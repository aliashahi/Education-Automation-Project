
import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { SharedAnnService } from '../../services/shared-ann.service';
import { Announcement } from 'src/app/manager/models/announcement.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { ConfirmDialogDto } from 'src/app/shared/modules/confirm/models/confirm-dialog.dto';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};


@Component({
  selector: 'EAP-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})

export class TeacherDashboardComponent implements OnInit {
  @ViewChild('addannoun')
  private divAnnoun = {} as ElementRef;
  //message : string = '';
  //title : string = '';
  //announcement : string = '';
  list!: any[];
  selected: Date | null | undefined;

  showKind: 'list' | 'grid' = 'list';
  searchedValue!: string;
  startDate!: string;
  endDate!: string;
  allData: Announcement[] = [];
  filteredData: Announcement[] = [];
  pendding: boolean = false;

  /*---------- cart------------*/
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;


  constructor(
    private route : Router,
    private renderer: Renderer2,
    private annSrv: AnnouncementService) {
      this.chartOptions = {
        series: [
          {
            name: "basic",
            data: [6, 14, 20, 3]
          }
        ],
        chart: {
          type: "bar",
          height: 200,
          width: 600
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Minimum"
          ]
        }
      };
      this.getData();
     
     }

 
  clickme(){
    this.route.navigate(['/teacher/sessions']);
  }

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
      console.log(res);
      this.onFilterAnnouncements();
    },
    (e) => {},
    () => {
      this.pendding = false;
    }
  );
}


private deleteAnnouncement(id : any) {
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
/*------------------------------------------*/

  ngOnInit(): void {}
}
  
export class TeacherDashboardComponent {}

