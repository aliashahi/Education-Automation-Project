import { User } from './user.model';

export interface Class {
  id: number;
  name: string;
  grade: string;
  status: string;
  description: string;
  startClassDate: string;
  endClassDate: string;
}
