import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';

@Component({
  selector: 'EAP-profile-dialog',
  templateUrl: './profile.dialog.html',
  styleUrls: ['./profile.dialog.scss'],
})
export class ProfileDialog implements OnInit {
  pendding: boolean = false;
  tabIndex: number = 0;
  user_form!: FormGroup;
  extra_form!: FormGroup;
  user!: User;
  extraInfo!: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    private userSrv: UserService,
    private alertSrv: AlertService,
    private tokenPipe: TokenDecoderPipe
  ) {}

  ngOnInit() {
    this.pendding = true;
    this.init_user_form();
    this.init_extra_form();
    this.userSrv
      .getUserFullInfo(
        this.tokenPipe.transform('0', 'user_id'),
        this.tokenPipe.transform('S', 'role')
      )
      .subscribe(
        (res) => {
          this.user = res.user;
          this.extraInfo = { ...res, user: undefined };
          this.user_form.setValue({
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
          });
          this.extra_form.setValue({
            nationalId: this.extraInfo.nationalId,
            birthDate: this.extraInfo.birthDate,
            phoneNumber: this.extraInfo.phoneNumber,
            mobileNumber: this.extraInfo.mobileNumber,
            address: this.extraInfo.address,
          });
        },
        (e) => {},
        () => {
          this.pendding = false;
        }
      );
  }

  private init_user_form() {
    this.user_form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
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

  onUpdateUserInfo() {
    this.user_form.disable();
    this.pendding = true;
    this.userSrv.updateProfile({ ...this.user_form.value }).subscribe(
      (res) => {
        this.alertSrv.showToaster('User updated Successfully!', 'SUCCESS');
        localStorage.setItem('USER_INFO', JSON.stringify(res));
        location.reload();
      },
      (e) => {},
      () => {
        this.user_form.enable();
        this.pendding = false;
      }
    );
  }

  onUpdateUserExtraInfo() {
    this.extra_form.disable();
    this.pendding = true;
    let userType = this.tokenPipe.transform('S', 'role') || 'S';
    this.userSrv
      .updateUserExtraInfo(
        {
          ...this.extra_form.value,
          profileImage: null,
          id: this.tokenPipe.transform('S', 'user_id'),
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
