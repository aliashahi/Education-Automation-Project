import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../classes/service-base';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService extends ServiceBase {
  constructor(_inject: Injector) {
    super(_inject);
  }

  createAssignment(classId: number, model: any) {
    return this.post$(`school/classes/${classId}/assignments/`, model);
  }

  getAssignments(classId: number, model: any) {
    return this.get$(`school/classes/${classId}/assignments/`, []);
  }
}
