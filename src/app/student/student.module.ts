import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './container/student/student.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AsignmentsListComponent } from './components/asignments-list/asignments-list.component';
import { AsignmentsDetailComponent } from './components/asignments-list/asignments-detail/asignments-detail.component';
import { UploadAsignmentComponent } from './components/asignments-list/asignments-detail/upload-asignment/upload-asignment.component';
import { RollCallCalanderComponent } from './components/roll-call-calander/roll-call-calander.component';
import { StudentAnnouncementsComponent } from './components/student-announcements/student-announcements.component';

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
        path: 'roll-call',
        component: RollCallCalanderComponent,
      },
      {
        path: 'announcement',
        component: StudentAnnouncementsComponent,
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
    AsignmentsDetailComponent,
    UploadAsignmentComponent,
    RollCallCalanderComponent,
    StudentAnnouncementsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class StudentModule {}
