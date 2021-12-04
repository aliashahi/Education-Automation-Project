import { LoginDto, RegisterDto, UpdateProfileDto } from './login.dto';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';
import { UserSearchDto } from './user.dto';
@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  public login(model: LoginDto) {
    return this.post$('auth/jwt/create/', model);
  }

  public register(model: RegisterDto) {
    return this.post$('auth/users/', model);
  }

  public updateProfile(model: UpdateProfileDto) {
    return this.put$('auth/users/me/', model);
  }

  public deleteUser(id: number) {
    return this.delete$('auth/users/' + id);
  }

  public getMyInfo() {
    return this.get$('auth/users/me/');
  }

  public getStudents(model: UserSearchDto) {
    return this.get$('school/students/', this.createParamList(model));
  }

  public getTeachers(model: UserSearchDto) {
    return this.get$('school/teachers/', this.createParamList(model));
  }

  public getManagers(model: UserSearchDto) {
    return this.get$('school/managers/', this.createParamList(model));
  }
}
