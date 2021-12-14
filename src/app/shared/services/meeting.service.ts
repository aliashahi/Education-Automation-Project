import { Injectable, Injector } from '@angular/core';
import { Class } from 'src/app/manager/models/class.model';
import { ServiceBase } from '../classes/service-base';

@Injectable({
  providedIn: 'root',
})
export class MeetingService extends ServiceBase {
  constructor(_inject: Injector) {
    super(_inject);
  }

  getMeetings(searchModel: any) {
    return this.get$('school/meeting/', this.createParamList(searchModel));
  }

  createMeeting(model: Class) {
    return this.post$('school/meeting/', model);
  }

  deleteMeeting(id: number) {
    return this.delete$('school/meeting/' + id);
  }
}
