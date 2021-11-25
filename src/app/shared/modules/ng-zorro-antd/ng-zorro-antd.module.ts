import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const MODULES = [
  CommonModule,
  NzPageHeaderModule,
  NzIconModule,
  NzUploadModule,
  NzDividerModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ZorroAntdModule {}
