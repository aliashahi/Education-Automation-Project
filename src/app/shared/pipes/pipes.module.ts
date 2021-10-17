import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateHnadlerPipe } from "./date-hnadler.pipe";

const PIPES = [DateHnadlerPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
  providers: [...PIPES],
})
export class PipesModule {}
