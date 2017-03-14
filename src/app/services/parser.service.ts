import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FacebookApiService } from './';

@Injectable()
export class ParserService {
  private _isSearching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSearching: Observable<boolean> = this._isSearching.asObservable();

  private _event: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public event: Observable<any> = this._event.asObservable();

  private _messages: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public messages: Observable<any> = this._messages.asObservable();

  constructor(private fbApi: FacebookApiService) { }

  startSearch() {
    this._isSearching.next(true);
    this.fbApi.get(`/${this._event.value.id}/feed`, ['message', 'picture', 'from', 'id']).subscribe((response) => {
      this._messages.next(response.json().data)
    })
  }

  stopSearch() {
    this._isSearching.next(false);
  }

  resetSearch() {
    this.stopSearch();
    this._messages.next([]);
    this.startSearch();
  }

  setEvent(event) {
    this._event.next(event);
  }

}
