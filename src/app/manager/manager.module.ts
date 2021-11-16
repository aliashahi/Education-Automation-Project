import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './container/manager/manager.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { ClassCreateComponent } from './components/class/class-create/class-create.component';
import { ClassListComponent } from './components/class/class-list/class-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { SelectedTeacherListComponent } from './components/class/class-create/selected-teacher-list/selected-teacher-list.component';
import { FormBuilderModule } from '../shared/modules/form-builder';
import { WeeklyScheduleComponent } from './components/class/class-create/weekly-schedule/weekly-schedule.component';
import { ClassPreviewComponent } from './components/class/class-create/class-preview/class-preview.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './components/announcement/create-announcement/create-announcement.component';
import { AnnouncementListComponent } from './components/announcement/announcement-list/announcement-list.component';

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
        path: 'class-create',
        component: ClassCreateComponent,
      },
      {
        path: 'class-list',
        component: ClassListComponent,
      },
      {
        path: 'announcement-create',
        component: CreateAnnouncementComponent,
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
    ManagerDashboardComponent,
    UserCreateComponent,
    ClassCreateComponent,
    ClassListComponent,
    UserListComponent,
    SelectedTeacherListComponent,
    WeeklyScheduleComponent,
    ClassPreviewComponent,
    AnnouncementComponent,
    CreateAnnouncementComponent,
    AnnouncementListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormBuilderModule,
    RouterModule.forChild(routes),
  ],
})
export class ManagerModule {}
