import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TeacherComponent } from './container/teacher/teacher.component';
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
  declarations: [TeacherComponent, TeacherDashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class TeacherModule {}
