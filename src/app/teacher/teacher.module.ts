import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './container/teacher/teacher.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { TeacherClassComponent } from './components/teacher-class/teacher-class.component';
import { RollcallComponent } from './components/rollcall/rollcall.component';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedAnnService } from './services/shared-ann.service';

import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

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
        path: 'announcement',
        component: AnnouncementComponent,
      },
      {
        path: 'rollcall',
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
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ModalModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [SharedAnnService],
})
export class TeacherModule {}
