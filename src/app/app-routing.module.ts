import { NgModule } from '@angular/core';
import { AuthGuard } from './core/gaurd/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from "./utitlitiy/error/error.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
    // component: ErrorComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
