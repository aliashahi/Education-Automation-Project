export interface Announcement {
  id: number;
  title: string;
  description: string;
  liked: number;
  seen: number;
  allClasses?: false;
  allStudents?: false;
  allTeachers?: true;
  classes?: any[];
  expire_date?: string;
  group?: 'Tea';
  has_comment?: boolean;
  start_date?: string;
  status: string;
  students: any[];
  teachers: any[];
}
