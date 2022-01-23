import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longTextCutter',
})
export class LongTextCutterPipe implements PipeTransform {
  transform(value: string, count: number = 100): string {
    if (typeof value == 'string') {
      if (count === 0 || value.length <= count) return value;
      else return value.slice(0, count) + ' ...';
    }
    return ' ';
  }
}
