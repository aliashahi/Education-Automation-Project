import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLessTabsDirective } from './header-less-tabs.directive';

const DIRECTIVES = [HeaderLessTabsDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES],
})
export class DirectivesModule {}
