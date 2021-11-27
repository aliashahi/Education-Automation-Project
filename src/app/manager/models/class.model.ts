import { User } from './user.model';

export interface Class {
  id: number;
  title: string;
  description: string;
  grade: number;
  students?: User[];
  status: string;
  start_date: string;
  end_date: string;
}
