import { FileDto } from "src/app/shared/models/file.dto";

export enum ASIGNMENT_STATUS {
  SUBMITED = 'Submitted',
  NOT_SUBMITED = 'Not Submitted',
  EXPIRED = 'Expired',
}

export interface Asignment {
  id: number;
  title: string;
  description?: string;
  file: string;
  filesToShow: FileDto[];
  created?: string;
  deadline: string;
  updated?: string;
}
export interface Week {
  week_id: number;
  start_date?: Date;
  end_date?: Date;
  asignments: Asignment[];
}
