import {
HttpEvent,
HttpHandler,
HttpRequest,
HttpInterceptor,
HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class HttpsInterceptor implements HttpInterceptor {
  FREE_OF_TOKEN = [environment.apiBaseUrl + 'auth/users/'];
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
    let tokenizedRequest!: HttpRequest<any>;
    if (this.FREE_OF_TOKEN.find((i) => request.url == i))
      tokenizedRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    else
      tokenizedRequest = request.clone({
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
      catchError((error: HttpErrorResponse) =>
        this.errorHandler(error, tokenizedRequest)
      )
    );
  }

  errorHandler(error: HttpErrorResponse, request: HttpRequest<any>) {
    this.loadingSrv.hide();
    if (error instanceof HttpErrorResponse && error.status === 500) {
      this.alertSrvc.showToaster('Something Bad Happend right now!', 'DANGER');
      return EMPTY;
    }
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.alertSrvc.showToaster('Not Found!', 'DANGER');
      return EMPTY;
    }

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.alertSrvc.showToaster(error.error.detail, 'DANGER');
      if (!this.router.url.includes('auth')) {
        localStorage.clear();
        this.router.navigate(['auth/login']);
      }
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
    return EMPTY;
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
