import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

const API_VERSION = 'v2.8'
const API_URL = `https:/graph.facebook.com/${API_VERSION}`;

@Injectable()
export class FacebookApiService {
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public token: Observable<string> = this._token.asObservable();

  constructor(private http: Http) { }

  get(url: string, fields: Array<string> = [], params: Object = {}): Observable<Response> {
    let mappedFields = `&fields=${fields.join(',')}`
    return this.http.get(`${API_URL}${url}?access_token=${this._token.value}${mappedFields}`, params);
  }

  post(url: string, params: any): Observable<Response> {
    return this.http.post(`${API_URL}${url}?access_token=${this._token.value}`, params);
  }

  delete(url: string, params: any = {}): Observable<Response> {
    return this.http.delete(`${API_URL}${url}?access_token=${this._token.value}`, params);
  }

  setToken(token) {
    this._token.next(token);
  }
}
