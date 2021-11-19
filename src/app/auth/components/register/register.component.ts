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
    // role: new FormControl('S'),
  });
  pendding = false;

  constructor(
    private router: Router,
    private UserService: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.loginRef$ = this.UserService.register(this.forms.value).subscribe(
        (response) => {
          this.router.navigate(['/auth/login']);
          this.pendding = false;
          this.forms.enable();
        },
        (error) => {
          this.alertSrv.showToaster('please enter valid information', 'DANGER');
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
