import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmDialog],
  imports: [CommonModule, MaterialModule, MatDialogModule],
  exports: [ConfirmDialog],
})
export class ConfirmModule {}
