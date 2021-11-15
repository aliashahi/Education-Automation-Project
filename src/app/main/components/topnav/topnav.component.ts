import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'EAP-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
