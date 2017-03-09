import { Component } from '@angular/core';
import { LoginService } from './../services';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private loginService: LoginService) { }

  loginFB() {
    this.loginService.loginFacebook();
  }

}
