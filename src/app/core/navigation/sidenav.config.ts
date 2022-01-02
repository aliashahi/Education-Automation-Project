import { ACCESS_TYPE } from 'src/app/core/types/access.type';

export interface SidenavNode {
  name: string;
  url: string;
  icon: string;
  ACCESS: ACCESS_TYPE;
  children?: SidenavNode[];
  hasDividerAfter?: boolean;
}

export const SIDENAV_CONFIG: SidenavNode[] = [
  ///////////manager menu//////////////
  {
    name: 'Dashboard',
    url: '/manager/dashboard',
    ACCESS: 'M',
    icon: 'dashboard',
    hasDividerAfter: true,
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
    name: 'Manage Meetings',
    icon: 'watch_later',
    url: '/manager/meeting-create',
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
  //TEACHER CONFIG
  {
    name: 'Dashboard',
    url: '/teacher/dashboard',
    ACCESS: 'T',
    icon: 'dashboard',
  },
  {
    name: 'Classes',
    url: '/teacher/class-list',
    ACCESS: 'T',
    icon: 'class',
  },
  {
    name: 'Create Announcement',
    url: '/teacher/announcement',
    ACCESS: 'T',
    icon: 'send',
  },
  {
    name: 'Announcement list',
    url: '/teacher/announcement-list',
    ACCESS: 'T',
    icon: 'campaign',
  },
  {
    name: 'Roll Call',
    url: '/teacher/sessions',
    ACCESS: 'T',
    icon: 'rule',
  },
  //TEACHER END
  //STUDENT CONFIG
  {
    name: 'Dashboard',
    url: '/student/dashboard',
    ACCESS: 'S',
    icon: 'dashboard',
  },
  {
    name: 'Asignments',
    url: '/student/asignments',
    ACCESS: 'S',
    icon: 'auto_stories',
  },
  {
    name: 'Roll Call',
    url: '/student/roll-call',
    ACCESS: 'S',
    icon: 'rule',
  },
  {
    name: 'Announcements',
    url: '/student/announcement',
    ACCESS: 'S',
    icon: 'campaign',
  },
  //STUDENT END
];
