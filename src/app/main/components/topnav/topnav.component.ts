import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'EAP-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
