import { CoreModule } from './core';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './utitlitiy/error/error.component';
import { TokenDecoderPipe } from './shared/pipes/token-decoder.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    CoreModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, TokenDecoderPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
