export interface RollCallCalanderDay {
  dayNumber: number | null;
  wasAbsent: boolean | null;
  events: string[];
}
export interface RollCallCalanderMonth {
  year: number;
  month: number;
  monthTitle: string;
  days: RollCallCalanderDay[];
}
