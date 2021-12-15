import {
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexResponsive,
  ApexDataLabels,
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ProfileDialog } from 'src/app/main/components/profile-dialog/profile.dialog';
export type areaChartOptions = {
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries;
};

export type pieChartOptions = {
  labels: any;
  chart: ApexChart;
  responsive: ApexResponsive[];
  series: ApexNonAxisChartSeries;
};
@Component({
  selector: 'EAP-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public areaChart: areaChartOptions;
  public pieChart: pieChartOptions;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alertSrv: AlertService
  ) {
    this.areaChart = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    this.pieChart = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  onEditProfile() {
    this.dialog.open(ProfileDialog);
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }
}
