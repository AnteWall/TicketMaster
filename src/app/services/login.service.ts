import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FacebookApiService } from './facebook-api.service';
import { Profile } from './../models';

var oauth = require('oauth-electron-facebook').oauth;
var facebook = require('oauth-electron-facebook').facebook;
declare var require: any
const { BrowserWindow } = (window as any).require('electron').remote;

const FB_APP_ID = 710824895663274;//'77226356314502877;
const FB_APP_SECRET = '55767825ca6ddd8b36ef1b0329211a02';//'926fbd813a9c0febc8b790ea181ea7a4';
const FB_REDIRECT_URL = 'https://www.facebook.com/connect/login_success.html';
const FB_LOGIN_URL = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URL}`;

@Injectable()
export class LoginService {
  private _profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public profile: Observable<Profile> = this._profile.asObservable();

  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn: Observable<boolean> = this._loggedIn.asObservable();

  constructor(private fbApi: FacebookApiService) {
    this.profile.subscribe((profile) => {
      console.log(profile);
    });
  }

  loginFacebook(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let fbWindow = new BrowserWindow({ width: 720, height: 480, modal: true, show: true, webPreferences: { nodeIntegration: false } });
      var info = new facebook(FB_APP_ID, FB_APP_SECRET, 'user_events,publish_actions', {});
      var auth = new oauth();
      auth.login(info, fbWindow).then((response) => {
        this.fbApi.setToken(response.oauth_access_token)
        this.getProfile();
        fbWindow.close();
        resolve();
      });
    });
  }

  private getUserEvents(userData) {
    return this.fbApi.get(`/${userData.id}/events`).subscribe((events: any) => {
      this._profile.next(Object.assign({}, userData, { events: events.json().data }));
      this._loggedIn.next(true);
    });
  }

  private getProfile() {
    this.fbApi.get('/me', ['id', 'name', 'picture']).subscribe(
      (response) => {
        this.getUserEvents(response.json());
      },
      (err) => console.error(err)
    );
  }

}
