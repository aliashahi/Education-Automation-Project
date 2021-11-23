import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  personal_form!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  pendding = false;
  user!: User;

  constructor(private userSrv: UserService, private alertSrv: AlertService) {
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
  //       password2: 'ILOVEDJANGO',
  //       email: user.email,
  //       role: 'T',
  //     })
  //     .subscribe(
  //       () => {},
  //       () => {},
  //       () => {
  //         if (index + 1 < 10) {
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
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('', Validators.required),
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
}
