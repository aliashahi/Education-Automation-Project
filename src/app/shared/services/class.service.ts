import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../classes/service-base';
import { Class } from 'src/app/manager/models/class.model';
interface ClassSearchDto {
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassService extends ServiceBase {
  constructor(_inject: Injector) {
    super(_inject);
  }

  getClassList(searchModel: ClassSearchDto) {
    return this.get$('school/classes/', this.createParamList(searchModel));
  }

  getClassById(id: number) {
    return this.get$(`school/classes/${id}`);
  }

  createClass(model: any) {
    return this.post$('school/classes/', model);
  }

  updateClass(id: number, model: any) {
    return this.put$(`school/classes/${id}`, model);
  }

  patchClassImage(id: number, model: FormData) {
    return this.patch$(`school/classes/${id}`, model);
  }

  deleteClass(id: number) {
    return this.delete$('school/classes/' + id);
  }
}
