import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParserService {
  private _isSearching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSearching: Observable<boolean> = this._isSearching.asObservable();

  private _event: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public event: Observable<any> = this._event.asObservable();

  startSearch() {
    this._isSearching.next(true);
  }

  stopSearch() {
    this._isSearching.next(false);
  }

  resetSearch() {
    this.stopSearch();
    this.startSearch();
  }

  setEvent(event) {
    this._event.next(event);
  }

}
