import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginService, FacebookApiService } from './services';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [LoginService, FacebookApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
