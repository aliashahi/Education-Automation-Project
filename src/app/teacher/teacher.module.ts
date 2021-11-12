import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TeacherComponent } from './container/teacher/teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
<<<<<<< HEAD
import { AnnouncementComponent } from './components/announcement/announcement.component';
import {FormsModule} from '@angular/forms';

=======
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TeacherClassComponent } from './components/teacher-class/teacher-class.component';
>>>>>>> b227399c68dd15d1692a25b5dc4d8b579e4803ef
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
<<<<<<< HEAD
        path: 'announcement',
        component: AnnouncementComponent,
=======
        path: 'class',
        component: TeacherClassComponent
>>>>>>> b227399c68dd15d1692a25b5dc4d8b579e4803ef
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
<<<<<<< HEAD
  declarations: [TeacherComponent, TeacherDashboardComponent, AnnouncementComponent],
  imports: [CommonModule, SharedModule,FormsModule, RouterModule.forChild(routes)],
=======
  declarations: [TeacherComponent, TeacherDashboardComponent, TeacherClassComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes),MatDatepickerModule],

>>>>>>> b227399c68dd15d1692a25b5dc4d8b579e4803ef
})
export class TeacherModule {}

