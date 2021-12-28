import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { ActivatedRoute } from '@angular/router';

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
  hidePass: boolean = true;
  file!: File | string;
  fileUrl: string = '';
  constructor(
    private userSrv: UserService,
    private alertSrv: AlertService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.init_personal_form();
    this.init_extra_form();
    this.checkAndStartEditMode();
  }

  private checkAndStartEditMode() {
    if (this.activeRoute.snapshot.params.id) {
      let id = this.activeRoute.snapshot.params.id;
      let access = this.activeRoute.snapshot.params.access;
      this.pendding = true;
      this.personal_form.disable();
      this.userSrv.getUserById(id, access).subscribe(
        (res) => {
          let user = res.user;
          this.user = res.user;
          this.fileUrl = res.profileImage;
          this.personal_form.setValue({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            password: '************',
          });
          this.pendding = false;
          this.personal_form.enable();
        },
        (error) => {
          this.pendding = false;
          this.personal_form.enable();
        }
      );
    }
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
      (e) => {
        this.personal_form.enable();
        this.pendding = false;
      },
      () => {
        this.personal_form.enable();
        this.pendding = false;
      }
    );
  }

  onupdateExtraInfo(stepper: MatStepper) {
    this.extra_form.disable();
    this.pendding = true;
    let userType = this.user.role ?? 'S';
    let formData = new FormData();
    let model = this.extra_form.value;
    Object.entries({
      user: this.user.id,
      profileImage: this.file,
      nationalId: model.nationalId,
      birthDate: createDateFormat(model.birthDate),
      phoneNumber: model.phoneNumber,
      mobileNumber: model.mobileNumber,
      address: model.address,
    }).forEach((i) => {
      formData.append(i[0], i[1]);
    });
    this.userSrv
      .updateUserExtraInfoById(formData, this.user.id, <any>userType)
      .subscribe(
        (res) => {
          this.alertSrv.showToaster('User updated Successfully!', 'SUCCESS');
          stepper.next();
        },
        (e) => {
          this.extra_form.enable();
          this.pendding = false;
        },
        () => {
          this.extra_form.enable();
          this.pendding = false;
        }
      );
  }
}
