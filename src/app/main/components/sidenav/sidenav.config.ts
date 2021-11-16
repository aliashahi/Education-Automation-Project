export interface SidenavNode {
  name: string;
  url: string;
  icon: string;
  ACCESS: 'T' | 'S' | 'M';
  children?: SidenavNode[];
}

export const TREE_DATA: SidenavNode[] = [
  ///////////manager menu//////////////
  {
    name: 'Dashboard',
    url: '/manager/dashboard',
    ACCESS: 'M',
    icon: 'dashboard',
  },
  {
    name: 'Create User',
    icon: 'person_add',
    url: '/manager/user-create',
    ACCESS: 'M',
  },
  {
    name: 'User List',
    icon: 'people',
    url: '/manager/user-list',
    ACCESS: 'M',
  },
  {
    name: 'Create Class',
    icon: 'bookmark_add',
    url: '/manager/class-create',
    ACCESS: 'M',
  },
  {
    name: 'Class List',
    icon: 'class',
    url: '/manager/class-list',
    ACCESS: 'M',
  },
  {
    name: 'Create Announcement',
    icon: 'send',
    url: '/manager/announcement-create',
    ACCESS: 'M',
  },
  {
    name: 'Announcement List',
    icon: 'campaign',
    url: '/manager/announcement-list',
    ACCESS: 'M',
  },
  // {
  //   name: 'User management',
  //   url: '/manager/user',
  //   ACCESS: 'M',
  //   icon: 'people_alt',
  //   children: [
  //     {
  //       name: 'create',
  //       icon: 'add',
  //       url: '/manager/user-create',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'list',
  //       icon: 'list',
  //       url: '/manager/user-list',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'archive',
  //       icon: 'archive',
  //       url: '/manager/user-archive',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'reports',
  //       icon: 'summarize',
  //       url: '/manager/user-reports',
  //       ACCESS: 'M',
  //     },
  //   ],
  // },
  // {
  //   name: 'Classes',
  //   url: '/manager/class',
  //   ACCESS: 'M',
  //   icon: 'class',
  //   children: [
  //     {
  //       name: 'create',
  //       icon: 'add',
  //       url: '/manager/class-create',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'list',
  //       icon: 'list',
  //       url: '/manager/class-list',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'archive',
  //       icon: 'archive',
  //       url: '/manager/class-achives',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'reports',
  //       icon: 'summarize',
  //       url: '/manager/class-reports',
  //       ACCESS: 'M',
  //     },
  //   ],
  // },
  // {
  //   name: 'Analysis',
  //   url: '/manager/analysis',
  //   ACCESS: 'M',
  //   icon: 'analytics',
  //   children: [
  //     {
  //       name: 'Poll',
  //       url: '/manager/analysis-poll',
  //       ACCESS: 'M',
  //       icon: 'poll',
  //       children: [
  //         {
  //           name: 'create',
  //           icon: 'add',
  //           url: '/manager/analysis-poll-create',
  //           ACCESS: 'M',
  //         },
  //         {
  //           name: 'list',
  //           icon: 'list',
  //           url: '/manager/analysis-poll-list',
  //           ACCESS: 'M',
  //         },
  //         {
  //           name: 'reports',
  //           icon: 'summarize',
  //           url: '/manager/analysis-poll-reports',
  //           ACCESS: 'M',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Financial',
  //       icon: 'attach_money',
  //       url: '/manager/analysis-financial',
  //       ACCESS: 'M',
  //     },
  //     {
  //       name: 'Events',
  //       icon: 'festival',
  //       url: '/manager/analysis-events',
  //       ACCESS: 'M',
  //     },
  //   ],
  // },
  /////////////////////////////////////////
];
