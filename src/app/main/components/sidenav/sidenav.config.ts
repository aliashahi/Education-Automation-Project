export interface SidenavNode {
  name: string;
  url: string;
  children?: SidenavNode[];
}

export const TREE_DATA: SidenavNode[] = [
  {
    name: 'Users',
    url: '#',
    children: [
      { name: 'create', url: '#' },
      { name: 'list', url: '#' },
      { name: 'archive', url: '#' },
      { name: 'reports', url: '#' },
    ],
  },
  {
    name: 'Classes',
    url: '#',
    children: [
      { name: 'create', url: '#' },
      { name: 'list', url: '#' },
      { name: 'archive', url: '#' },
      { name: 'reports', url: '#' },
    ],
  },
];
