import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TeacherComponent } from './container/teacher/teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { FormsModule } from '@angular/forms';
import { TeacherClassesComponent } from './components/teacher-classes/teacher-classes.component';
import { ErrorComponent } from '../utitlitiy/error/error.component';
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
        component: TeacherClassesComponent,
      },
      {
        path: '**',
        component: ErrorComponent,
      },
    ],
  },
  {
    path: '**',
    component: ErrorComponent,
    // redirectTo: '',
  },
];

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent,
    AnnouncementComponent,
    TeacherClassesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class TeacherModule {}
