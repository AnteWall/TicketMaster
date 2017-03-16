import { Component, Input } from '@angular/core';
declare var require: any
const { shell } = (window as any).require('electron');

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input('message') message: any;

  openExternal() {
    shell.openExternal(this.message.permalink_url)
  }
}
