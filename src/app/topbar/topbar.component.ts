import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from './../services';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private eventCtrl: FormControl;
  private events: Array<any>;
  filteredEvents: any;

  constructor(private loginService: LoginService) {
    this.eventCtrl = new FormControl();
    this.filteredEvents = this.eventCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterEvents(name));
    this.loginService.profile.subscribe((profile) => {
      if (profile && profile.events) {
        this.events = profile.events;
      }
    });
  }

  filterEvents(val: string) {
    console.log(val);
    return val ? this.events.filter((s) => new RegExp(val, 'gi').test(s.name)) : this.events;
  }
}
