import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';
import { ACCESS_TYPE } from '../types/access.type';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  readonly ACCESS_LIST = ['M', 'S', 'T'];

  constructor(private router: Router, private tokenDecoder: TokenDecoderPipe) {
    window.addEventListener(
      'storage',
      this.doNavigateOnStorageChange.bind(this)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let access_type: ACCESS_TYPE = 'S';
    if (
      this.ACCESS_LIST.includes(this.tokenDecoder.transform('S', 'role') || 'S')
    ) {
      access_type =
        <ACCESS_TYPE>this.tokenDecoder.transform('S', 'role') || 'S';
    }
    if (state.url.includes('manager') && access_type != 'M') {
      this.doNavigation(access_type);
      return false;
    }
    if (state.url.includes('student') && access_type != 'S') {
      this.doNavigation(access_type);
      return false;
    }
    if (state.url.includes('teacher') && access_type != 'T') {
      this.doNavigation(access_type);
      return false;
    }
    return true;
  }

  private doNavigation(access_type: ACCESS_TYPE) {
    switch (access_type) {
      case 'M':
        this.router.navigate(['/manager']);
        break;
      case 'T':
        this.router.navigate(['/teacher']);
        break;
      case 'S':
        this.router.navigate(['/student']);
        break;
    }
  }

  private doNavigateOnStorageChange() {
    let access_type: ACCESS_TYPE = 'S';
    if (
      this.ACCESS_LIST.includes(this.tokenDecoder.transform('S', 'role') || 'S')
    ) {
      access_type =
        <ACCESS_TYPE>this.tokenDecoder.transform('S', 'role') || 'S';
    }
    // if (
    //   !this.ACCESS_LIST.includes(
    //     this.tokenDecoder.transform('S', 'role') || 'UNKNOWN'
    //   )
    // )
    //   localStorage.setItem('ACCESS_TYPE', 'S');
    this.doNavigation(access_type);
  }
}
