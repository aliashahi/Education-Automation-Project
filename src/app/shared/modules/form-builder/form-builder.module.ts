import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { FormCellComponent } from './components/form-cell/form-cell.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

@NgModule({
  declarations: [FormCellComponent, FilterFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [FilterFormComponent],
})
export class FormBuilderModule {}
