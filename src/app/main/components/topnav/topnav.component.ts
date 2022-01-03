import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile.dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'EAP-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();
  pendding: boolean = false;
  constructor(
    private router: Router,
    private userSrv: UserService,
    private alertSrv: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pendding = true;
    this.userSrv.getMyInfo().subscribe((res) => {
      localStorage.setItem('USER_INFO', JSON.stringify(res));
      localStorage.setItem('ACCESS_TYPE', res.role);
      this.pendding = false;
    });
  }

  onEditProfile(menu: MatMenuTrigger) {
    menu.closeMenu();
    this.dialog.open(ProfileDialog);
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }
}
