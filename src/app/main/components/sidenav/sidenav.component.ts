import { NestedTreeControl } from '@angular/cdk/tree';
import { ACCESS_TYPE } from 'src/app/core/types/access.type';
import { SidenavNode, SIDENAV_CONFIG } from './sidenav.config';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TokenDecoderPipe } from 'src/app/shared/pipes/token-decoder.pipe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'EAP-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  readonly ACCESS_LIST = ['M', 'S', 'T'];

  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();

  treeControl = new NestedTreeControl<SidenavNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SidenavNode>();

  constructor(private tokenDecoder: TokenDecoderPipe) {
    this.doNavigateOnStorageChange();
    window.addEventListener(
      'storage',
      this.doNavigateOnStorageChange.bind(this)
    );
  }

  private get currentUrl(): string {
    return document.URL;
  }

  hasChild = (_: number, node: SidenavNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.treeControl.isExpanded = (dataNode: SidenavNode) =>
      this.treeControl.expansionModel.isSelected(dataNode) ||
      this.currentUrl.includes(dataNode.url);
  }

  private doNavigateOnStorageChange() {
    let access_type: ACCESS_TYPE = 'S';
    if (
      this.ACCESS_LIST.includes(this.tokenDecoder.transform('S', 'role') || 'S')
    ) {
      access_type =
        <ACCESS_TYPE>this.tokenDecoder.transform('S', 'role') || 'S';
    }
    // if (
    //   !this.ACCESS_LIST.includes(
    //     this.tokenDecoder.transform('S', 'role') || 'UNKNOWN'
    //   )
    // )
    //   localStorage.setItem('ACCESS_TYPE', 'S');
    this.dataSource.data = SIDENAV_CONFIG.filter(
      (nav) => nav.ACCESS == access_type
    );
  }
}
