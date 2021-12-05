import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';

@Component({
  selector: 'EAP-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  personal_form!: FormGroup;
  extra_form!: FormGroup;
  isEditable = false;
  pendding = false;
  user!: User;

  constructor(
    private userSrv: UserService,
    private alertSrv: AlertService,
    private tokenPipe: TokenDecoderPipe
  ) {
    // let user = USER_MOCK_DATA[0];
    // let index = 0;
    // this.insertFakeUser(user, index);
  }

  // insertFakeUser(user: User, index: number) {
  //   this.userSrv
  //     .register({
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       username: user.username,
  //       password: 'ILOVEDJANGO',
  //       // password2: 'ILOVEDJANGO',
  //       email: user.email,
  //       role: Math.floor(Math.random() * 1000) % 10 == 0 ? 'T' : 'S',
  //     })
  //     .subscribe(
  //       () => {},
  //       () => {},
  //       () => {
  //         if (index + 1 < 800) {
  //           index++;
  //           this.insertFakeUser(
  //             USER_MOCK_DATA[USER_MOCK_DATA.length - index],
  //             index
  //           );
  //         }
  //       }
  //     );
  // }

  ngOnInit() {
    this.init_personal_form();
    this.init_extra_form();
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
      role: new FormControl('S'),
    });
  }
  private init_extra_form() {
    this.extra_form = new FormGroup({
      nationalId: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
      ]),
      birthDate: new FormControl(
        new Date(
          new Date().getFullYear() - 21,
          new Date().getMonth(),
          new Date().getDay()
        ),
        Validators.required
      ),
      phoneNumber: new FormControl(null, [
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
      ]),
      mobileNumber: new FormControl(null, [
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
      ]),
      address: new FormControl(null, Validators.required),
    });
  }

  onRegisterUser(stepper: MatStepper) {
    this.personal_form.disable();
    this.pendding = true;
    this.userSrv.register({ ...this.personal_form.value }).subscribe(
      (res) => {
        this.user = res;
        this.alertSrv.showToaster('User created Successfully!', 'SUCCESS');
        stepper.next();
      },
      (e) => {},
      () => {
        this.personal_form.enable();
        this.pendding = false;
      }
    );
  }

  onupdateExtraInfo(stepper: MatStepper) {
    this.extra_form.disable();
    this.pendding = true;
    let userType = this.tokenPipe.transform('S', 'role') || 'S';
    this.userSrv
      .updateUserExtraInfo(
        {
          ...this.extra_form.value,
          profileImage: null,
          id: this.user.id,
          birthDate: createDateFormat(this.extra_form.value.birthDate),
        },
        userType
      )
      .subscribe(
        (res) => {
          this.alertSrv.showToaster('User updated Successfully!', 'SUCCESS');
        },
        (e) => {},
        () => {
          this.extra_form.enable();
          this.pendding = false;
        }
      );
  }
}
