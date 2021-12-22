import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../classes/service-base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ServiceBase {
  constructor(_inject: Injector) {
    super(_inject);
  }

  public get imageBaseUrl(): string {
    return environment.apiBaseUrl
      .split('')
      .slice(0, environment.apiBaseUrl.split('').length - 1)
      .join('');
  }

  getClassResources(classId: number) {
    return this.get$(`school/classes/${classId}/resources/`);
  }

  uploadClassResourceFile(classId: number, model: any) {
    return this.post$(`school/classes/${classId}/resources/`, model);
  }

  deleteClassResource(classId: number, id: number) {
    return this.delete$(`school/classes/${classId}/resources/${id}`);
  }
}
