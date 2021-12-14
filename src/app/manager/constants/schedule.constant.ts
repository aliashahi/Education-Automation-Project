export interface Meeting {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDayType;
}

export type WeekDayType = 'SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export const WEEK_DAYS = [
  {
    label: 'Saturday',
    value: 'SAT',
  },
  {
    label: 'Sunday',
    value: 'SUN',
  },
  {
    label: 'Monday',
    value: 'MON',
  },
  {
    label: 'Tuesday',
    value: 'TUE',
  },
  {
    label: 'Wednesday',
    value: 'WED',
  },
  {
    label: 'Thursday',
    value: 'THU',
  },
  {
    label: 'Friday',
    value: 'FRI',
  },
];
