import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading: boolean;
  loading_counter = 0;
  constructor() {
    this._isLoading = false;
  }
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public show() {
    if (this.loading_counter > 0) {
      this.loading_counter++;
      return;
    }
    this.loading_counter++;
    this._isLoading = true;
  }
  public hide() {
    if (this.loading_counter > 1) {
      this.loading_counter--;
      return;
    }
    this.loading_counter--;
    this._isLoading = false;
  }
}
