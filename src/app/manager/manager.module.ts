import { NgModule } from '@angular/core';
import { HttpsInterceptor } from '../core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManagerComponent } from './container/manager/manager.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { ClassCreateComponent } from './components/class/class-create/class-create.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { AsignStudentsComponent } from './components/class/class-create/asign-students/asign-students.component';
import { WeeklyScheduleComponent } from './components/class/class-create/weekly-schedule/weekly-schedule.component';
import { AnnouncementListComponent } from './components/announcement/announcement-list/announcement-list.component';
import { AnnouncementCreateComponent } from './components/announcement/announcement-create/announcement-create.component';
import { DefineMeetingsDialog } from './components/class/class-create/weekly-schedule/define-meetings-dialog/define-meetings.dialog';
import { SelectedTeacherListComponent } from './components/class/class-create/selected-teacher-list/selected-teacher-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'dashboard',
        component: ManagerDashboardComponent,
      },
      {
        path: 'user-create',
        component: UserCreateComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'meeting-create',
        component: MeetingComponent,
      },
      {
        path: 'class-create',
        component: ClassCreateComponent,
      },
      {
        path: 'class-create/:id',
        component: ClassCreateComponent,
      },
      {
        path: 'class-list',
        component: ClassListComponent,
      },
      {
        path: 'announcement-create',
        component: AnnouncementCreateComponent,
      },
      {
        path: 'announcement-list',
        component: AnnouncementListComponent,
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
    ManagerComponent,
    MeetingComponent,
    UserListComponent,
    ClassListComponent,
    UserCreateComponent,
    DefineMeetingsDialog,
    ClassCreateComponent,
    AsignStudentsComponent,
    WeeklyScheduleComponent,
    ManagerDashboardComponent,
    AnnouncementListComponent,
    AnnouncementCreateComponent,
    SelectedTeacherListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
  ],
})
export class ManagerModule {}
