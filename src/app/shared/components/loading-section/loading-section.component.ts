import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-section',
  templateUrl: './loading-section.component.html',
  styleUrls: ['./loading-section.component.scss'],
})
export class LoadingSectionComponent implements OnInit {
  @Input() loading!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
