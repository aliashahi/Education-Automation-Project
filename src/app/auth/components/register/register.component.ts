import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private loginRef$!: Subscription;
  hidePass1 = true;
  hidePass2 = true;
  forms = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  pendding = false;

  constructor(
    private router: Router,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.loginRef$ = this.userSrv
        .register({ ...this.forms.value, role: 'S', password2: undefined })
        .subscribe(
          (response) => {
            this.alertSrv.showToaster('user created Successfully!', 'SUCCESS');
            this.router.navigate(['/auth/login']);
            this.pendding = false;
            this.forms.enable();
          },
          (error) => {
            this.alertSrv.showToaster(
              'please enter valid information',
              'DANGER'
            );
            this.pendding = false;
            this.forms.enable();
          }
        );
    }
  }

  onRedirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onCancelRequest() {
    if (this.pendding) {
      this.pendding = false;
      this.forms.enable();
      this.loginRef$.unsubscribe();
    }
  }
}
