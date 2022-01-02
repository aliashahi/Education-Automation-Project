import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private loginRef$!: Subscription;
  hide = true;
  forms = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    remember_me: new FormControl(false),
  });
  pendding = false;

  constructor(
    private router: Router,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Token')) {
      this.router.navigate(['/']);
    }
  }

  onLogin() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.loginRef$ = this.userSrv.login(this.forms.value).subscribe(
        (response) => {
          localStorage.setItem('Token', response.access);
          localStorage.setItem('Refresh', response.refresh);
          this.alertSrv.showToaster(
            'You are Successfully loged in!',
            'SUCCESS'
          );
          this.userSrv.getMyInfo().subscribe(
            (res) => {
              this.userSrv.getUserFullInfo(res.id, res.role).subscribe(
                (res2: any) => {
                  localStorage.setItem(
                    'USER_INFO',
                    JSON.stringify({ ...res, ...res2 })
                  );
                  this.pendding = false;
                  this.router.navigate(['/']);
                  this.forms.enable();
                },
                (e) => {
                  localStorage.setItem('USER_INFO', JSON.stringify({ ...res }));
                  this.pendding = false;
                  this.router.navigate(['/']);
                  this.forms.enable();
                }
              );
            },
            (e) => {
              this.pendding = false;
              this.forms.enable();
            }
          );
        },
        (error) => {
          this.pendding = false;
          this.forms.enable();
        },
        () => {}
      );
    }
  }

  onRedirectToRegister() {
    this.router.navigate(['/auth/register']);
  }

  onCancelRequest() {
    if (this.pendding) {
      this.pendding = false;
      this.forms.enable();
      this.loginRef$.unsubscribe();
    }
  }
}
