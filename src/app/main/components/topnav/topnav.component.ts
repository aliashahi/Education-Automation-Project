import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'EAP-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();
  constructor(private router: Router, private userSrv: UserService) {}

  ngOnInit(): void {
    this.userSrv.getMyInfo().subscribe((res) => {
      localStorage.setItem('USER_INFO', JSON.stringify(res));
    });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
