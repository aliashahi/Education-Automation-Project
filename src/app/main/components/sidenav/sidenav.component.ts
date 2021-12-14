import { ACCESS_TYPE } from 'src/app/core/types/access.type';
import {
  SidenavNode,
  SIDENAV_CONFIG,
} from '../../../core/navigation/sidenav.config';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'EAP-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly ACCESS_LIST = ['M', 'S', 'T'];

  data: SidenavNode[] = [];

  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();

  constructor(private tokenDecoder: TokenDecoderPipe) {
    this.doNavigateOnStorageChange();
    window.addEventListener(
      'storage',
      this.doNavigateOnStorageChange.bind(this)
    );
  }

  private doNavigateOnStorageChange() {
    let access_type: ACCESS_TYPE = 'S';
    if (
      this.ACCESS_LIST.includes(this.tokenDecoder.transform('S', 'role') || 'S')
    ) {
      access_type =
        <ACCESS_TYPE>this.tokenDecoder.transform('S', 'role') || 'S';
    }
    this.data = SIDENAV_CONFIG.filter((nav) => nav.ACCESS == access_type);
  }
}
