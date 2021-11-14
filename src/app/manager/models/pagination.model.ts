import { PageEvent } from '@angular/material/paginator';

export interface Pagination extends PageEvent {
  pageSizeOptions: number[];
}
