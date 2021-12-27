import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../modules/alert/alert.service';
import { ProfileDialog } from 'src/app/main/components/profile-dialog/profile.dialog';
import { ResourceService } from '../../services/resource.service';
import { TokenDecoderPipe } from '../../pipes/token-decoder.pipe';
import { UserInfoPipe } from '../../pipes/user-info.pipe';

@Component({
  selector: 'EAP-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  hasProfileImg: boolean = true;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alertSrv: AlertService,
    private userPipe: UserInfoPipe
  ) {}

  getImageUrl(): string {
    return this.userPipe.transform('', 'profileImage');
  }

  ngOnInit(): void {}

  onEditProfile() {
    this.dialog.open(ProfileDialog);
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }
}
