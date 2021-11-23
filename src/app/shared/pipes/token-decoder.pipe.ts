import { Pipe, PipeTransform } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Pipe({
  name: 'tokenDecoder',
})
export class TokenDecoderPipe implements PipeTransform {
  transform(defaultValue: string, key: string): any {
    let user: any = localStorage.getItem('USER_INFO');
    if (user) {
      try {
        user = JSON.parse(user);
        return user[key];
      } catch {
        return defaultValue;
      }
    }

    // let token = localStorage.getItem('Token');
    // try {
    //   if (token) {
    //     let decoded: any = jwt_decode(token);
    //     if (decoded[key]) return decoded[key];
    //   }
    // } catch {}
    return defaultValue;
  }
}
