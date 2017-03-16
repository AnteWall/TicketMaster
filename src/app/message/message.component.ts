import { FacebookApiService } from '../services';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';
moment.locale('sv');
declare var require: any
const { shell } = (window as any).require('electron');

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input('message') message: any;

  constructor(private fbApi: FacebookApiService) { }

  openExternal() {
    shell.openExternal(this.message.permalink_url)
  }

  deleteAutocomment() {
    this.fbApi.delete(`/${this.message.myCommentId}`).subscribe((success) => {
      this.message.myCommentId = null;
    });
  }

  timeAgo() {
    return moment(this.message.created_time).fromNow();
  }
}
