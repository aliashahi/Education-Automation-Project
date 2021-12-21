export enum ASIGNMENT_STATUS {
  SUBMITED = 'Submitted',
  NOT_SUBMITED = 'Not Submitted',
  EXPIRED = 'Expired',
}

export interface Asignment {
  id: number;
  title: string;
  short_desc: string;
  left_days: number;
  expire_date: string;
  status: ASIGNMENT_STATUS;
}
export interface Week {
  week_id: number;
  start_date?: Date;
  end_date?: Date;
  asignments: Asignment[];
}
