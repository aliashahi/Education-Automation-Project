import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, HttpsInterceptor } from './core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './utitlitiy/error/error.component';
import { RollcallComponent } from './components/teacher/rollcall/rollcall.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent, RollcallComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
