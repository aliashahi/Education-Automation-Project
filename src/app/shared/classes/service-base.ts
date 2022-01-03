import { Observable, of } from 'rxjs';
import { ParamDto } from './param.dto';
import { Injector } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { AlertService } from '../modules/alert/alert.service';

export abstract class ServiceBase {
  private http: HttpClient;
  private alertSrv: AlertService;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.alertSrv = injector.get(AlertService);
  }

  public get BaseUrl(): string {
    return environment.apiBaseUrl;
  }

  protected post$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.post(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  protected get$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.get(this.BaseUrl + url + this.getSerializedParams(params));
  }

  protected delete$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.delete(
      this.BaseUrl + url + this.getSerializedParams(params)
    );
  }

  protected put$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.put(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  protected patch$(
    url: string,
    body: any,
    params: ParamDto[] = []
  ): Observable<any> {
    return this.http.patch(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  private getSerializedParams(params: ParamDto[]) {
    if (!params || params.length == 0) return '';
    return '?' + params.map((param) => param.key + '=' + param.value).join('&');
  }

  public createParamList(model: any): ParamDto[] {
    return Object.entries(model).map((i) => {
      return { key: i[0], value: String(i[1]) };
    });
  }
}
