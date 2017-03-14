import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FacebookApiService, SettingsService } from './';

@Injectable()
export class ParserService {
  private _isSearching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSearching: Observable<boolean> = this._isSearching.asObservable();

  private _event: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public event: Observable<any> = this._event.asObservable();

  private _messages: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public messages: Observable<any> = this._messages.asObservable();

  private _interval = null;
  private intervalTimeout = 3000;

  constructor(private fbApi: FacebookApiService, private settingsService: SettingsService) {
    this.settingsService.updateInterval.subscribe((intervalTimeout) => {
      this.intervalTimeout = intervalTimeout * 1000; // Convert to milliseconds
      if (this._isSearching.value) {
        this.resetSearch()
      }
    });
  }

  startSearch() {
    this._isSearching.next(true);
    this.getFeedData(); // Get a feed directly instead of waiting for first interval to trigger
    this._interval = setInterval(() => {
      this.getFeedData();
    }, this.intervalTimeout);
  }

  stopSearch() {
    clearInterval(this._interval);
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

  private getFeedData(): void {
    this.fbApi.get(`/${this._event.value.id}/feed`, ['message', 'picture', 'from', 'id']).subscribe((response) => {
      this._messages.next(response.json().data);
    });
  }
}
