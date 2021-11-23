import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/services/user.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-profile-dialog',
  templateUrl: './profile.dialog.html',
  styleUrls: ['./profile.dialog.scss'],
})
export class ProfileDialog implements OnInit {
  pendding: boolean = false;

  personal_form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit() {
    this.init_personal_form();
    let user: any = localStorage.getItem('USER_INFO');
    if (user) {
      try {
        user = JSON.parse(user);
        this.personal_form.setValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
      } catch {}
    }
  }

  private init_personal_form() {
    this.personal_form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
    });
  }

  onUpdateUser() {
    this.personal_form.disable();
    this.pendding = true;
    this.userSrv.updateProfile({ ...this.personal_form.value }).subscribe(
      (res) => {
        this.alertSrv.showToaster('User created Successfully!', 'SUCCESS');
        localStorage.setItem('USER_INFO', JSON.stringify(res));
        localStorage.setItem('ACCESS_TYPE', res.role);
        this.dialogRef.close();
        location.reload();
      },
      (e) => {},
      () => {
        this.personal_form.enable();
        this.pendding = false;
      }
    );
  }
}
