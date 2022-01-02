import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const MODULES = [
  CommonModule,
  NzPageHeaderModule,
  NzIconModule,
  NzUploadModule,
  NzDividerModule,
  NzCardModule,
  NzAvatarModule,
  NzBreadCrumbModule,
  NzEmptyModule,
  NzCollapseModule,
  NzTabsModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ZorroAntdModule {}
