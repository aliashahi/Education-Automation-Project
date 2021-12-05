import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from './pipes/pipes.module';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmModule } from './modules/confirm';
import { ZorroAntdModule } from './modules/ng-zorro-antd/ng-zorro-antd.module';
import { DirectivesModule } from './directives/directives.module';
import { LoadingSectionComponent } from './components/loading-section/loading-section.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  ZorroAntdModule,
  PipesModule,
  HttpClientModule,
  ConfirmModule,
  DirectivesModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, LoadingSectionComponent],
  declarations: [LoadingSectionComponent],
})
export class SharedModule {}
