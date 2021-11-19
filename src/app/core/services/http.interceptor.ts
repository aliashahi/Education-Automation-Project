import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(private alertSrvc: AlertService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      this.alertSrvc.showToaster(
        'you are not connected to Internet ,Please check your connection!',
        'DANGER'
      );
      return EMPTY;
    }
    let token = localStorage.getItem('Token');
    if (token == null || token == undefined) token = '';
    let tokenizedRequest = request.clone({
      setHeaders: {
        Authentication: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(tokenizedRequest).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  errorHandler(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.alertSrvc.showToaster('Not Found Error!', 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.alertSrvc.showToaster('Your Session has been Expired!', 'DANGER');
      if (!environment.devMode) this.router.navigate(['/auth/login']);
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.alertSrvc.showToaster('You are not Authorized!', 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 400) {
      return EMPTY;
    }

    this.alertSrvc.showToaster('Something went Wrong !!!', 'DANGER');
    return throwError(error);
  }
}
