import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AlertService } from '../shared/modules/alert/alert.service';
import { HttpsInterceptor } from '../core';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatRadioModule,
    HttpClientModule,
  ],
  exports: [LoginComponent, RegisterComponent],
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
export class AuthModule {}
