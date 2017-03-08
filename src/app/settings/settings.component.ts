import { Component, OnInit } from '@angular/core';
import { LoginService, SettingsService } from './../services';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private profile: Object;
  private autoComment: boolean = false;
  private updateInterval: number = 3;

  constructor(private loginService: LoginService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.loginService.profile.subscribe((profile) => this.profile = profile);
  }

  setUpdateInterval(updatedValue) {
    this.settingsService.setUpdateIntercal(updatedValue);
  }
}
