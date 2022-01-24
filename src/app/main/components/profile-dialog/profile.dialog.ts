import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/manager/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import { createDateFormat } from 'src/app/shared/utils/date.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';
import { ResourceService } from 'src/app/shared/services/resource.service';
import { UserInfoPipe } from 'src/app/shared/pipes/user-info.pipe';

@Component({
  selector: 'EAP-profile-dialog',
  templateUrl: './profile.dialog.html',
  styleUrls: ['./profile.dialog.scss'],
})
export class ProfileDialog implements OnInit {
  user!: User;
  extraInfo!: any;
  tabIndex: number = 0;
  user_form!: FormGroup;
  extra_form!: FormGroup;
  pendding: boolean = false;
  file!: File | string | undefined;
  fileUrl: string = '';
  needReload = false;

  constructor(
    private userSrv: UserService,
    private alertSrv: AlertService,
    private resourceSrv: ResourceService,
    private tokenPipe: TokenDecoderPipe,
    private userPipe: UserInfoPipe,
    public dialogRef: MatDialogRef<ProfileDialog>
  ) {}

  public get imageBaseUrl(): string {
    return this.resourceSrv.imageBaseUrl;
  }

  getImageUrl(): string {
    return this.userPipe.transform('', 'profileImage');
  }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe((res) => {
      if (this.needReload) location.reload();
    });
    this.init_user_form();
    this.init_extra_form();
    this.pendding = true;
    this.user_form.disable();
    this.extra_form.disable();
    this.userSrv
      .getUserFullInfo(
        this.tokenPipe.transform('0', 'user_id'),
        this.tokenPipe.transform('S', 'role')
      )
      .subscribe(
        (res: any) => {
          this.user = res.user;
          this.fileUrl = res.profileImage;
          this.extraInfo = { ...res, user: undefined };
          this.user_form.setValue({
            first_name: this.user.first_name ?? '',
            last_name: this.user.last_name ?? '',
            email: this.user.email ?? '',
          });
          this.extra_form.setValue({
            nationalId: this.extraInfo.nationalId ?? '',
            birthDate: this.extraInfo.birthDate ?? '',
            phoneNumber: this.extraInfo.phoneNumber ?? '',
            mobileNumber: this.extraInfo.mobileNumber ?? '',
            address: this.extraInfo.address ?? '',
          });
          this.user_form.enable();
          this.extra_form.enable();
          this.pendding = false;
        },
        (e) => {
          this.user_form.enable();
          this.extra_form.enable();
          this.pendding = false;
          this.dialogRef.close();
        }
      );
  }

  private init_user_form() {
    this.user_form = new FormGroup({
      last_name: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  private init_extra_form() {
    this.extra_form = new FormGroup({
      nationalId: new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      birthDate: new FormControl(
        new Date(
          new Date().getFullYear() - 21,
          new Date().getMonth(),
          new Date().getDay()
        )
      ),
      phoneNumber: new FormControl(null, [
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      mobileNumber: new FormControl(null, [
        Validators.minLength(11),
        Validators.maxLength(11),
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
        this.user_form.enable();
        this.pendding = false;
        this.needReload = true;
      },
      (e) => {
        this.user_form.enable();
        this.pendding = false;
      }
    );
  }

  onUpdateUserExtraInfo() {
    this.extra_form.disable();
    this.pendding = true;
    let userType = this.tokenPipe.transform('S', 'role') || 'S';
    let formData = new FormData();
    let model = this.extra_form.value;
    Object.entries({
      user: this.user.id,
      id: this.extraInfo.id,
      profileImage: this.file,
      nationalId: model.nationalId,
      birthDate: createDateFormat(model.birthDate),
      phoneNumber: model.phoneNumber,
      mobileNumber: model.mobileNumber,
      address: model.address,
    }).forEach((i) => {
      formData.append(i[0], i[1]);
    });
    this.userSrv.updateUserExtraInfo(formData, userType).subscribe(
      (res) => {
        this.alertSrv.showToaster('User updated Successfully!', 'SUCCESS');
        this.extra_form.enable();
        this.pendding = false;
        this.needReload = true;
      },
      (e) => {
        this.extra_form.enable();
        this.pendding = false;
      }
    );
  }
}
