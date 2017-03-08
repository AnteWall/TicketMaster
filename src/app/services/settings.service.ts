import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
  private _updateInterval: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public updateInterval: Observable<number> = this._updateInterval.asObservable();

  setUpdateIntercal(seconds: number): void {
    this._updateInterval.next(seconds);
  }
}
