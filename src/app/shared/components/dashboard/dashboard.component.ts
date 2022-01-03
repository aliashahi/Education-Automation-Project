import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoPipe } from '../../pipes/user-info.pipe';
import { AlertService } from '../../modules/alert/alert.service';
import { UserService } from 'src/app/auth/services/user.service';
import { ProfileDialog } from 'src/app/main/components/profile-dialog/profile.dialog';

@Component({
  selector: 'EAP-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  new_date = new Date();
  gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  hasProfileImg: boolean = true;
  showCharts: boolean = true;
  hideCarts: boolean = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alertSrv: AlertService,
    private userPipe: UserInfoPipe,
    private userService: UserService
  ) {}

  getImageUrl(): string {
    return this.userPipe.transform('', 'profileImage');
  }

  ngOnInit(): void {
    this.showCharts = this.userPipe.transform('', 'role') == 'M';
    this.hideCarts = this.userPipe.transform('', 'role') == 'S';
    if (this.showCharts) {
      forkJoin(
        this.userService.getStudents({}),
        this.userService.getTeachers({}),
        this.userService.getManagers({})
      ).subscribe((res) => {
        this.CARD_CONFIG[0].number = res[0].count;
        this.CARD_CONFIG[1].number = res[1].count;
        this.CARD_CONFIG[2].number = res[2].count;
      });
    }
  }

  onEditProfile() {
    this.dialog.open(ProfileDialog);
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }

  CARD_CONFIG = [
    {
      textClass: 'text-blue-700',
      classes: ` 
      from-[#e8fffe]
      via-[#b3fffd]
      to-[#adf1ff]
      `,
      number: 0,
      desc: 'Studnets!',
    },
    {
      textClass: 'text-green-700',
      classes: ` 
      from-[#e3fff6]
      via-[#afffe4]
      to-[#79ffd2]
      `,
      number: 0,
      desc: 'Teachers!',
    },
    {
      textClass: 'text-red-700',
      classes: ` 
      from-[#ffd7d7]
      via-[#ffc9c9]
      to-[#ffa7a7]
      `,
      number: 0,
      desc: 'Managers!',
    },
    {
      textClass: 'text-purple-700',
      classes: ` 
      from-[#f0dcff]
      via-[#e7c8ff]
      to-[#d9a7ff]
      `,
      number: 102,
      desc: 'Reward!',
    },
  ];
}
