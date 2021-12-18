import { Pipe, PipeTransform } from '@angular/core';
import { SUBJECT_MOCK_DATA } from 'src/app/manager/mock/subject.mock';

@Pipe({
  name: 'classSubject',
})
export class ClassSubjectPipe implements PipeTransform {
  transform(value?: string): any {
    return SUBJECT_MOCK_DATA.find((i) => i.value == value)?.label || '-';
  }
}
