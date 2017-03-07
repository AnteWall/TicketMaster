import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private profile: Object;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.profile.subscribe((profile) => this.profile = profile);
  }

}
