import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './container/main/main.component';
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
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
})
export class MainModule {}
