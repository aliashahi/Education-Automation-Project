import { LoginDto, RegisterDto, UpdateProfileDto } from './login.dto';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';
import { UserSearchDto } from './user.dto';
import { Subject } from 'rxjs';
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

  getUserFullInfo(userId: number, userType: 'S' | 'T' | 'M' = 'S') {
    let user = 'students';
    let subscription;
    switch (userType) {
      case 'M':
        user = 'managers';
        subscription = this.getManagers({});
        break;
      case 'T':
        user = 'teachers';
        subscription = this.getTeachers({});
        break;
      default:
        subscription = this.getStudents({});
    }
    let result = new Subject();
    subscription.subscribe(
      (res) => {
        let foundUser = res.results.find((i: any) => i.user.id == userId);
        if (foundUser)
          this.get$(`school/${user}/me`).subscribe(
            (res2) => {
              result.next({ ...res2, ...foundUser });
            },
            (e) => result.error(e)
          );
        else result.error({});
      },
      (e) => {
        result.error(e);
      }
    );
    return result;
  }

  public updateUserExtraInfo(model: any, userType: 'S' | 'T' | 'M') {
    let user = 'students';
    switch (userType) {
      case 'M':
        user = 'managers';
        break;
      case 'T':
        user = 'teachers';
        break;
    }
    return this.put$(`school/${user}/me/`, model);
  }

  public updateUserExtraInfoById(
    model: any,
    userId: number,
    userType: 'S' | 'T' | 'M'
  ) {
    let user = 'students';
    switch (userType) {
      case 'M':
        user = 'managers';
        break;
      case 'T':
        user = 'teachers';
        break;
    }
    return this.put$(`school/${user}/${userId}/`, model);
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

  public addStudentsToClass(id: number, model: any) {
    return this.put$(`school/students/${id}/`, model);
  }

  public getUserById(id: number, access: string) {
    let user = 'students';
    switch (access) {
      case 'M':
        user = 'managers';
        break;
      case 'T':
        user = 'teachers';
        break;
    }
    return this.get$(`school/${user}/${id}/`);
  }
}
