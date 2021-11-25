import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInfo',
})
export class UserInfoPipe implements PipeTransform {
  transform(defaultValue: string, key: string): any {
    let user: any = localStorage.getItem('USER_INFO');
    try {
      user = JSON.parse(user);
      if (user[key]) return user[key];
    } catch {}
    return defaultValue;
  }
}
