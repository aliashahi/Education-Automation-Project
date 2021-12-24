import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileDialog } from '../profile-dialog/profile.dialog';
import { UserService } from 'src/app/auth/services/user.service';
import { BreadcrumpPipe } from 'src/app/shared/pipes/breadcrump.pipe';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();
  pendding: boolean = false;
  breadcrump: { url: string; value: string; name: string }[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userSrv: UserService,
    private alertSrv: AlertService,
    private breadcrumbPipe: BreadcrumpPipe
  ) {}

  ngOnInit(): void {
    this.pendding = true;
    this.userSrv.getMyInfo().subscribe((res) => {
      localStorage.setItem('USER_INFO', JSON.stringify(res));
      this.pendding = false;
    });
    this.breadcrump = this.breadcrumbPipe.transform([]);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrump = this.breadcrumbPipe.transform([]);
      }
    });
  }

  onEditProfile(menu: MatMenuTrigger) {
    menu.closeMenu();
    this.dialog.open(ProfileDialog);
  }

  navigateToAnnouncements() {
    let access = this.router.url.split('/')[1];
    if (!['manager', 'student', 'teacher'].includes(access)) access = 'student';
    this.router.navigate(['', access, 'announcement-list']);
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }
}
