import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { LoginService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  private loggedIn: boolean = false;
  constructor(private loginService: LoginService) {
    this.loginService.loggedIn.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.sidenav.open();
      }
    })
  }
}
