import { AUTOCOMMENT_MESSAGE_DEFAULT, AUTOCOMMENT_ON_DEFAULT, UPDATE_INTERVAL_DEFAULT } from '../../constants';
import { Component, OnInit } from '@angular/core';
import { LoginService, SettingsService, ParserService } from './../services';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private profile: Object;
  private autoComment: boolean = AUTOCOMMENT_ON_DEFAULT;
  private autoCommentMessage: string = AUTOCOMMENT_MESSAGE_DEFAULT;
  private updateInterval: number = UPDATE_INTERVAL_DEFAULT;
  private isSearching: boolean = false;
  private currentEvent: any = null;

  constructor(
    private loginService: LoginService,
    private settingsService: SettingsService,
    private parserService: ParserService) { }

  ngOnInit() {
    this.loginService.profile.subscribe((profile) => this.profile = profile);
    this.parserService.event.subscribe((event) => {
      this.currentEvent = event
      if(this.isSearching) {
        this.parserService.resetSearch();
      }
    });
    this.parserService.isSearching.subscribe((isSearching) => this.isSearching = isSearching);
  }

  startSearch() {
    this.parserService.startSearch();
  }

  stopSearch() {
    this.parserService.stopSearch();
  }

  onAutoCommentChange(newValue) {
    this.settingsService.shouldAutocomment(newValue);
  }

  onAutoCommentMessageChange(newValue) {
    this.settingsService.setAutocommentMessage(newValue);
  }

  setUpdateInterval(updatedValue) {
    this.settingsService.setUpdateIntercal(updatedValue);
  }
}
