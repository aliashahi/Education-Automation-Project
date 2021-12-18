import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLessTabsDirective } from './header-less-tabs.directive';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';

const DIRECTIVES = [HeaderLessTabsDirective, DragDropFileUploadDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES],
})
export class DirectivesModule {}
