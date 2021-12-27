import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileDialog } from '../profile-dialog/profile.dialog';
import { UserService } from 'src/app/auth/services/user.service';
import { BreadcrumpPipe } from 'src/app/shared/pipes/breadcrump.pipe';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfoPipe } from 'src/app/shared/pipes/user-info.pipe';

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
  hasProfileImg: boolean = true;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userSrv: UserService,
    private userPipe: UserInfoPipe,
    private alertSrv: AlertService,
    private breadcrumbPipe: BreadcrumpPipe
  ) {}

  getImageUrl(): string {
    return this.userPipe.transform('', 'profileImage');
  }

  ngOnInit(): void {
    this.pendding = true;
    this.userSrv.getMyInfo().subscribe(
      (res) => {
        this.userSrv.getUserFullInfo(res.id, res.role).subscribe(
          (res2: any) => {
            localStorage.setItem(
              'USER_INFO',
              JSON.stringify({ ...res, ...res2 })
            );
            this.pendding = false;
          },
          (e) => {
            localStorage.setItem('USER_INFO', JSON.stringify({ ...res }));
            this.pendding = false;
          }
        );
      },
      (e) => {
        this.pendding = false;
      }
    );

    this.setBreadCrumps();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBreadCrumps();
      }
    });
  }

  private setBreadCrumps() {
    this.breadcrump = this.breadcrumbPipe.transform([]).map((i) => {
      return {
        name: i && i.name ? i.name : '',
        url: i && i.url ? i.url : '',
        value: i && i.value ? i.value : '',
      };
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
