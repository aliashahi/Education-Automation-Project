import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './container/manager/manager.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';

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
  declarations: [ManagerComponent, ManagerDashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ManagerModule {}
