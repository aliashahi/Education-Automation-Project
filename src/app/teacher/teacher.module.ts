import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedAnnService } from './services/shared-ann.service';
import { TeacherComponent } from './container/teacher/teacher.component';
import { RollcallComponent } from './components/rollcall/rollcall.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { TeacherClassComponent } from './components/teacher-class/teacher-class.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ViewScheduleComponent } from './components/teacher-class/view-schedule/view-schedule.component';
import { ViewStudentsComponent } from './components/teacher-class/view-students/view-students.component';
import { ViewWeeksComponent } from './components/teacher-class/view-weeks/view-weeks.component';
import { TeacherAsignmentsDetailComponent } from './components/teacher-class/view-weeks/teacher-asignments-detail/teacher-asignments-detail.component';
import { ViewResourcesComponent } from './components/teacher-class/view-resources/view-resources.component';
import { TeacherAnnouncementListComponent } from './components/teacher-announcement-list/teacher-announcement-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'dashboard',
        component: TeacherDashboardComponent,
      },
      {
        path: 'class-list',
        component: ClassListComponent,
      },
      {
        path: 'class/:id',
        component: TeacherClassComponent,
      },
      {
        path: 'announcement-list',
        component: TeacherAnnouncementListComponent,
      },
      {
        path: 'announcement-create',
        component: AnnouncementComponent,
      },
      {
        path: 'roll-call',
        component: RollcallComponent,
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
    TeacherComponent,
    TeacherDashboardComponent,
    AnnouncementComponent,
    TeacherClassComponent,
    RollcallComponent,
    ClassListComponent,
    ViewScheduleComponent,
    ViewStudentsComponent,
    ViewWeeksComponent,
    TeacherAsignmentsDetailComponent,
    ViewResourcesComponent,
    TeacherAnnouncementListComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [SharedAnnService],
})
export class TeacherModule {}
