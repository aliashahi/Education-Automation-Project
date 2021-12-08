import { Component } from '@angular/core';

@Component({
  selector: 'EAP-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSplash = true;
  constructor() {
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
