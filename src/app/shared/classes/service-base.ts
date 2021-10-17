import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParamDto } from './param.dto';

export abstract class ServiceBase {
  private http: HttpClient;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  public get BaseUrl(): string {
    return environment.ApiBaseUrl;
  }

  post$(url: string, body?: any, params: ParamDto[] = []): Observable<any> {
    return this.http.post(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  get$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.get(this.BaseUrl + url + this.getSerializedParams(params));
  }

  delete$(url: string, params: ParamDto[] = []): Observable<any> {
    return this.http.delete(
      this.BaseUrl + url + this.getSerializedParams(params)
    );
  }

  put$(url: string, body?: any, params: ParamDto[] = []): Observable<any> {
    return this.http.put(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }
  patch$(url: string, body?: any, params: ParamDto[] = []): Observable<any> {
    return this.http.patch(
      this.BaseUrl + url + this.getSerializedParams(params),
      body
    );
  }

  private getSerializedParams(params: ParamDto[]) {
    if (!params || params.length == 0) return '';
    return (
      '?' + params.map((param) => `${param.value}=${param.value}`).join('&')
    );
  }
}
