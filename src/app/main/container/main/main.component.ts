import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'EAP-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isExpanded = true;
  constructor() {}

  ngOnInit(): void {
    this.isExpanded = localStorage.getItem('FOLDED') == 'true' ? true : false;
  }

  logger() {
    localStorage.setItem('FOLDED', this.isExpanded.toString());
  }
}
