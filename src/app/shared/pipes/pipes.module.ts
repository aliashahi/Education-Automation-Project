import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateHnadlerPipe } from './date-handler.pipe';
import { TokenDecoderPipe } from './token-decoder.pipe';
import { LongTextCutterPipe } from './long-text-cutter.pipe';
import { AccessPipe } from './access.pipe';

const PIPES = [
  AccessPipe,
  DateHnadlerPipe,
  TokenDecoderPipe,
  LongTextCutterPipe,
];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
  providers: [...PIPES],
})
export class PipesModule {}
