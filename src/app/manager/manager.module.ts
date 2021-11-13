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
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormBuilderModule,
    RouterModule.forChild(routes),
  ],
})
export class ManagerModule {}
