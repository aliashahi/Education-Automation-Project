import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModule } from './modules/confirm';
import { PipesModule } from './pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { MaterialModule } from './modules/material/material.module';
import { ZorroAntdModule } from './modules/ng-zorro-antd/ng-zorro-antd.module';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { LoadingSectionComponent } from './components/loading-section/loading-section.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const MODULES = [
  FormsModule,
  PipesModule,
  ConfirmModule,
  MaterialModule,
  ZorroAntdModule,
  HttpClientModule,
  DirectivesModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  LoadingSectionComponent,
  SplashScreenComponent,
  DashboardComponent,
  FileUploaderComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
