import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateHnadlerPipe } from './date-hnadler.pipe';
import { TokenDecoderPipe } from './token-decoder.pipe';
import { LongTextCutterPipe } from './long-text-cutter.pipe';

const PIPES = [DateHnadlerPipe, TokenDecoderPipe, LongTextCutterPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
  providers: [...PIPES],
})
export class PipesModule {}
