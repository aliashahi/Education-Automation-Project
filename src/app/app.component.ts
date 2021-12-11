import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'EAP-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSplash = true;
  constructor(private router: Router) {
    if (!localStorage.getItem('Token')) this.router.navigate(['auth/login']);
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
