import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertType } from './models/alert-type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  showToaster(
    message: string,
    type: AlertType = 'INFO',
    duration: number = 5500
  ) {
    duration = Math.floor((message.length / 5) * 500);
    duration = duration > 3000 ? duration : 3000;
    switch (type) {
      case 'DANGER':
        this.toastr.error(message, 'ERROR', {
          timeOut: duration,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        break;
      case 'SUCCESS':
        this.toastr.success(message, 'SUCCESS', {
          timeOut: duration,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        break;
      case 'WARNING':
        this.toastr.warning(message, 'WARNNING', {
          timeOut: duration,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        break;
      case 'INFO':
        this.toastr.info(message, 'INFO', {
          timeOut: duration,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        break;
    }
  }
}
