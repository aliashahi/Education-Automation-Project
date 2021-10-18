import { Injectable } from '@angular/core';
import { AlertType } from './models/alert-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  showSnackbar(
    message: string,
    type: AlertType = 'INFO',
    duration: number = 5500
  ) {
    duration = Math.floor((message.length / 5) * 500);
    this._snackBar.open(message, '', {
      duration: duration > 3000 ? duration : 3000,
    });
  }
}
