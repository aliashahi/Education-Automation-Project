import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './container/main/main.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SharedModule } from '../shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'manager',
        loadChildren: () =>
          import('../manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('../teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../student/student.module').then((m) => m.StudentModule),
      },
      {
        path: '**',
        redirectTo: 'manager',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'manager',
  },
];
@NgModule({
  declarations: [MainComponent, SidenavComponent, TopnavComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTreeModule,
  ],
})
export class MainModule {}
