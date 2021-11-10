import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateHnadlerPipe } from './date-hnadler.pipe';
import { TokenDecoderPipe } from './token-decoder.pipe';

const PIPES = [DateHnadlerPipe, TokenDecoderPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
  providers: [...PIPES],
})
export class PipesModule {}
