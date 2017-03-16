import { AUTOCOMMENT_MESSAGE_DEFAULT, AUTOCOMMENT_ON_DEFAULT, UPDATE_INTERVAL_DEFAULT } from '../../constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
  private _updateInterval: BehaviorSubject<number> = new BehaviorSubject<number>(UPDATE_INTERVAL_DEFAULT);
  public updateInterval: Observable<number> = this._updateInterval.asObservable();

  private _autoComment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(AUTOCOMMENT_ON_DEFAULT);
  public autoComment: Observable<boolean> = this._autoComment.asObservable();

  private _autoCommentMessage: BehaviorSubject<string> = new BehaviorSubject<string>(AUTOCOMMENT_MESSAGE_DEFAULT);
  public autoCommentMessage: Observable<string> = this._autoCommentMessage.asObservable();

  setUpdateIntercal(seconds: number): void {
    this._updateInterval.next(seconds);
  }

  shouldAutocomment(should) {
    this._autoComment.next(should);
  }

  setAutocommentMessage(message) {
    this._autoCommentMessage.next(message);
  }
}
