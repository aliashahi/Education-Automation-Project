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
    path: 'main',
    component: MainComponent,
  },
  {
    path: '**',
    component: MainComponent,
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
