import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'EAP-asign-students',
  templateUrl: './asign-students.component.html',
  styleUrls: ['./asign-students.component.scss'],
})
export class AsignStudentsComponent implements OnInit {
  @Input() classId!: number;
  pending: boolean = false;

  displayedColumns: string[] = [
    'select',
    'first_name',
    'last_name',
    'username',
    'email',
  ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.pending = true;
    this.userSrv.getStudents({}).subscribe((res) => {
      this.dataSource.data = res.results;
      let inClass = res.results.filter(
        (i: any) => i.classroom && i.classroom.id == this.classId
      );
      this.selection.select(...inClass);
    });
  }

  addStudentsToClass(index: number = 0) {
    if (this.selection.selected.length == 0) return;
    this.pending = true;
    this.userSrv
      .addStudentsToClass(this.selection.selected[index].id, {
        ...this.selection.selected[index],
        ...this.selection.selected[index].user,
        id: undefined,
        user: this.selection.selected[index].user.id,
        classroom: +this.classId,
      })
      .subscribe(
        (res) => {
          if (this.selection.selected.length != index + 1)
            this.addStudentsToClass(index + 1);
          else this.pending = false;
        },
        (e) => {
          this.pending = false;
        }
      );
  }

  ///select methodss
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
}
