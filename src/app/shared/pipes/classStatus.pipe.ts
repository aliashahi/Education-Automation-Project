import { Pipe, PipeTransform } from '@angular/core';
import { CLASS_STATUS } from 'src/app/manager/constants/status.constant';

@Pipe({
  name: 'classStatus',
})
export class ClassStatusPipe implements PipeTransform {
  transform(value?: string): any {
    return CLASS_STATUS.find((i) => i.value == value)?.label || '-';
  }
}
