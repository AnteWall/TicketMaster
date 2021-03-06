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

  private TRIGGER_WORDS = ["säljer", "säljes", "kränga", "kränger", "kvarn"];

  private addedMessageIds = [];

  private alarm: any = new Audio('assets/alarm.mp3');

  private autoComment: boolean = false;
  private autoCommentMessage: string = "";

  constructor(private fbApi: FacebookApiService, private settingsService: SettingsService) {
    this.settingsService.updateInterval.subscribe((intervalTimeout) => {
      this.intervalTimeout = intervalTimeout * 1000; // Convert to milliseconds
      if (this._isSearching.value) {
        this.resetSearch()
      }
    });

    this.settingsService.autoComment.subscribe((shouldComment) => this.autoComment = shouldComment);
    this.settingsService.autoCommentMessage.subscribe((message) => this.autoCommentMessage = message);
  }

  startSearch() {
    this._isSearching.next(true);
    this.getFeedData(false); // Get a feed directly instead of waiting for first interval to trigger
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
    this.addedMessageIds = [];
    this.startSearch();
  }

  setEvent(event) {
    this._messages.next([]);
    this.addedMessageIds = [];
    this._event.next(event);
  }

  private getFeedData(triggerEvents: boolean = true): void {
    this.fbApi.get(`/${this._event.value.id}/feed`, ['message', 'picture', 'from', 'id', 'created_time', 'permalink_url']).subscribe((response) => {
      for (let message of response.json().data) {
        if (this.addedMessageIds.indexOf(message.id) === -1 && this.shouldTrigger(message)) {
          this.addedMessageIds.push(message.id);
          this._messages.next([message, ...this._messages.value]);
          if (triggerEvents) {
            this.alarm.play();
            if (this.autoComment) {
              this.postComment(message);
            }
          }
        }
      }
    });
  }

  postComment(post) {
    this.fbApi.post(`/${post.id}/comments`, {
      message: this.autoCommentMessage
    }).subscribe((response) => {
      post.myCommentId = response.json().id;
    });
  }

  private shouldTrigger(message: any): boolean {
    if (message.message) {
      for (let triggerWord of this.TRIGGER_WORDS) {

        var re = new RegExp(triggerWord, "i");
        if (message.message.search(re) > -1) {
          console.log(triggerWord);

          return true;
        }
      }
    }
    return false;
  }
}
