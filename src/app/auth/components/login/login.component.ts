import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { UserService } from '../../services/user.service';

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
    // role: new FormControl('S'),
    remember_me: new FormControl(false),
  });
  pendding = false;

  constructor(
    private router: Router,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }

  onLogin() {
    //dev mode
    // localStorage.setItem('Token', 'response.access');
    // localStorage.setItem('Refresh', 'response.refresh');
    // this.router.navigate(['/']);

    // return;
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
          this.router.navigate(['/']);
          this.pendding = false;
          this.forms.enable();
        },
        (error) => {
          this.alertSrv.showToaster(error.error.detail, 'DANGER');
          this.pendding = false;
          this.forms.enable();
        }
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
