import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ACCESS',
})
export class AccessPipe implements PipeTransform {
  readonly accss: { [ket: string]: string } = {
    M: 'Manager',
    T: 'Teacher',
    S: 'Student',
  };

  transform(value: string): string {
    if (['S', 'M', 'T'].includes(value)) return this.accss[value || 'S'];
    return 'Student';
  }
}
