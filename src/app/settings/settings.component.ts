import { Component, OnInit } from '@angular/core';
import { LoginService, SettingsService, ParserService } from './../services';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private profile: Object;
  private autoComment: boolean = false;
  private updateInterval: number = 3;
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

  setUpdateInterval(updatedValue) {
    console.log(this.currentEvent);
    this.settingsService.setUpdateIntercal(updatedValue);
  }
}
