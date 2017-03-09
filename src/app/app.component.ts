import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { LoginService, ParserService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  private loggedIn: boolean = false;
  private isSearching: boolean = false;

  constructor(private loginService: LoginService, private parserService: ParserService) {
    this.loginService.loggedIn.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.sidenav.open();
      }
    })

    this.parserService.isSearching.subscribe((isSearching) => this.isSearching = isSearching);
  }
}
