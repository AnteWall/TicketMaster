import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService, ParserService } from './../services';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private eventCtrl: FormControl;
  private events: Array<any>;
  private loggedIn: boolean = false;
  filteredEvents: any;

  constructor(private loginService: LoginService, private parserService: ParserService) {
    this.eventCtrl = new FormControl();
    this.filteredEvents = this.eventCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterEvents(name));
    this.loginService.profile.subscribe((profile) => {
      if (profile && profile.events) {
        this.events = profile.events;
      }
    });
    this.eventCtrl.valueChanges.subscribe((value) => this.onEventChange(value));
    this.loginService.loggedIn.subscribe((loggedIn) => this.loggedIn = loggedIn);
  }

  onEventChange(event) {
    if (typeof event === 'object') {
      return this.parserService.setEvent(event);
    }
    return this.parserService.setEvent(null);
  }

  displayName(event): string {
    return event ? event.name : event;
  }

  filterEvents(val: string) {
    return val ? this.events.filter((s) => new RegExp(val, 'gi').test(s.name)) : this.events;
  }
}
