import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from '../classes/service-base';
@Injectable({
  providedIn: 'root'
})
export class AttendancdService extends ServiceBase {

  constructor(_inject: Injector) {
    super(_inject);
   }

   getAttendanceListById(classId: number, sessionId: number) {
    return this.get$(`school/classes/${classId}/sessions/${sessionId}/attendances/`);
  }

  getSessionsByClassId(classId: number) {
    return this.get$(`school/classes/${classId}/sessions/`);
  }

  createSession(model: any) {
    return this.post$('school/classes/1/sessions/', model);
  }

  updateAttendance(classId: number, sessionId: number, attendanceId: number, model: any) {
    return this.put$(`school/classes/${classId}/sessions/${sessionId}/attendances/${attendanceId}/`, model);
  }

}
