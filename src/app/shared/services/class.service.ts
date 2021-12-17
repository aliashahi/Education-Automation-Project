import { Injectable, Injector } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import { ServiceBase } from '../classes/service-base';
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

  createClass(searchModel: Class) {
    return this.post$('school/classes/', searchModel);
  }

  deleteClass(id: number) {
    return this.delete$('school/classes/' + id);
  }
}
