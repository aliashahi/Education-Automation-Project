import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpsInterceptor implements HttpInterceptor {
  constructor(
    private alertSrvc: AlertService,
    private router: Router,
    private loadingSrv: LoadingService
  ) {}

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
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    });
    this.loadingSrv.show();
    return next.handle(tokenizedRequest).pipe(
      retry(0),
      tap((i) => {
        if (i.type != 0) this.loadingSrv.hide();
      }),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  errorHandler(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.alertSrvc.showToaster('Not Found!', 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.alertSrvc.showToaster(error.error.detail, 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.alertSrvc.showToaster('You are not Authorized!', 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 400) {
      this.create400ErrorMessage(error).forEach((e) => {
        this.alertSrvc.showToaster(e, 'DANGER');
      });
      return EMPTY;
    }

    this.alertSrvc.showToaster('Something went Wrong !!!', 'DANGER');
    return throwError(error);
  }

  private create400ErrorMessage(error: HttpErrorResponse): string[] {
    let list: string[] = [];
    Object.entries(error.error).forEach((e) => {
      if (typeof e[1] == 'string') list.push(String(e[1]));
      if (Array.isArray(e[1])) list.push(...e[1]);
    });
    return list;
  }
}
