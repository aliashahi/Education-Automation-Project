import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateHandlerPipe',
})
export class DateHnadlerPipe implements PipeTransform {
  transform(rawDate: string, format: string = 'YYYY/MM/DD'): any {
    return rawDate;
  }
}
