import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/manager/models/user.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [UserService],
})
export class UserCreateComponent implements OnInit {
  personal_form!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  pendding = false;
  user!: User;

  constructor(
    private _formBuilder: FormBuilder,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit() {
    this.init_personal_form();
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  private init_personal_form() {
    this.personal_form = new FormGroup({
      username: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password2: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl('S'),
    });
  }

  onRegisterUser(stepper: MatStepper) {
    this.personal_form.disable();
    this.pendding = true;
    this.userSrv.register(this.personal_form.value).subscribe(
      (res) => {
        this.user = res;
        this.alertSrv.showToaster('User created Successfully!', 'SUCCESS');
        stepper.next();
        this.personal_form.enable();
        this.pendding = false;
      },
      (e) => {
        this.alertSrv.showToaster('please enter valid information', 'DANGER');
        this.personal_form.enable();
        this.pendding = false;
      }
    );
  }
}
