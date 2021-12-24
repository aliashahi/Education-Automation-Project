import { NgModule } from '@angular/core';
import { AccessPipe } from './access.pipe';
import { CommonModule } from '@angular/common';
import { UserInfoPipe } from './user-info.pipe';
import { BreadcrumpPipe } from './breadcrump.pipe';
import { ClassStatusPipe } from './classStatus.pipe';
import { DateHnadlerPipe } from './date-handler.pipe';
import { ClassSubjectPipe } from './classSubject.pipe';
import { TokenDecoderPipe } from './token-decoder.pipe';
import { LongTextCutterPipe } from './long-text-cutter.pipe';

const PIPES = [
  AccessPipe,
  UserInfoPipe,
  DateHnadlerPipe,
  TokenDecoderPipe,
  LongTextCutterPipe,
  ClassStatusPipe,
  ClassSubjectPipe,
  BreadcrumpPipe,
];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
  providers: [...PIPES],
})
export class PipesModule {}
