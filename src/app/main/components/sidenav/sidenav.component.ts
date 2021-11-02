import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SidenavNode, TREE_DATA } from './sidenav.config';

@Component({
  selector: 'EAP-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  treeControl = new NestedTreeControl<SidenavNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SidenavNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: SidenavNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {}
}
