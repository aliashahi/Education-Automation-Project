import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
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
  constructor(
    private router: Router,
    private userSrv: UserService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    this.userSrv.getMyInfo().subscribe((res) => {
      localStorage.setItem('USER_INFO', JSON.stringify(res));
    });
  }

  onLogout() {
    localStorage.clear();
    this.alertSrv.showToaster('You loged out Successfully!', 'INFO');
    this.router.navigate(['/auth/login']);
  }
}
