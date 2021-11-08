import { LoginDto, RegisterDto } from './login.dto';
import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/classes/service-base';
@Injectable()
export class AuthService extends ServiceBase {
  constructor(injector: Injector) {
    super(injector);
  }

  public login(model: LoginDto) {
    return this.post$('auth/jwt/create/', model);
  }

  public register(model: RegisterDto) {
    return this.post$('auth/users/', model);
  }
}
