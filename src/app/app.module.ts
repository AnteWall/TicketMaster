import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginService, FacebookApiService, SettingsService } from './services';
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
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    LoginService,
    FacebookApiService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
