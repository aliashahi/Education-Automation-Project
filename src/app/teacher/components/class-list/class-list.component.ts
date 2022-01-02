import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'EAP-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  pending = false;
  private classes: Class[] = [];
  filteredClasses: Class[] = [];
  classStatusFilter = 'ACT';
  constructor(private classSrv: ClassService) {}

  ngOnInit(): void {
    this.getData();
  }

  onFilterChange(status: 'ACT' | 'PAS' | 'ARC') {
    this.classStatusFilter = status;
    this.onFilterClass();
  }

  private getData() {
    this.pending = true;
    this.classSrv.getClassList({}).subscribe(
      (res) => {
        this.classes = res.results;
        this.onFilterClass();
        this.pending = false;
      },
      (error) => {}
    );
  }

  private onFilterClass() {
    this.filteredClasses = this.classes.filter(
      (i) => i.status == this.classStatusFilter
    );
  }
}
