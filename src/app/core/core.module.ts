import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpsInterceptor } from "./services/http.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
