import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './container/student/student.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AsignmentsListComponent } from './components/asignments-list/asignments-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'asignments',
        component: AsignmentsListComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentDashboardComponent,
    AsignmentsListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class StudentModule {}
