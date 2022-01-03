import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'EAP-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isExpanded = true;
  constructor() {}

  ngOnInit(): void {}
}
