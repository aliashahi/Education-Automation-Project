import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TeacherComponent } from './container/teacher/teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

import { AnnouncementComponent } from './components/announcement/announcement.component';
import { FormsModule } from '@angular/forms';
import { TeacherClassComponent } from './components/teacher-class/teacher-class.component';
import { RollcallComponent } from './components/rollcall/rollcall.component';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
        path: 'class',
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
})
export class TeacherModule {}
