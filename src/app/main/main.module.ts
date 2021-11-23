import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './container/main/main.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SharedModule } from '../shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';
import { AlertService } from '../shared/modules/alert/alert.service';
import { UserService } from '../auth/services/user.service';
import { HttpsInterceptor } from '../core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessGuard } from '../core/gaurd/access.guard';
import { ProfileDialog } from './components/profile-dialog/profile.dialog';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'manager',
        loadChildren: () =>
          import('../manager/manager.module').then((m) => m.ManagerModule),
        canActivate: [AccessGuard],
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('../teacher/teacher.module').then((m) => m.TeacherModule),
        canActivate: [AccessGuard],
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../student/student.module').then((m) => m.StudentModule),
        canActivate: [AccessGuard],
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
  declarations: [
    MainComponent,
    SidenavComponent,
    TopnavComponent,
    ProfileDialog,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTreeModule,
  ],
  providers: [
    AlertService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
