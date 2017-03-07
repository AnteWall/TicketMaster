import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { LoginService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private token: string;
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private loginService: LoginService) {

  }

  loginFB() {
    this.loginService.loginFacebook().then(() => {
      this.sidenav.open();
    });
  }
}
