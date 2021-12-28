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
import { ApexPolarAreaComponent } from './components/dashboard/apex-polar-area/apex-polar-area.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexBoxPlotComponent } from './components/dashboard/apex-box-plot/apex-box-plot.component';
import { UploadProfileImageComponent } from '../shared/components/upload-profile-image/upload-profile-image.component';

const MODULES = [
  FormsModule,
  PipesModule,
  ConfirmModule,
  MaterialModule,
  ZorroAntdModule,
  HttpClientModule,
  DirectivesModule,
  ReactiveFormsModule,
  NgApexchartsModule,
];

const COMPONENTS = [
  LoadingSectionComponent,
  SplashScreenComponent,
  DashboardComponent,
  FileUploaderComponent,
  UploadProfileImageComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ApexPolarAreaComponent, ApexBoxPlotComponent],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
