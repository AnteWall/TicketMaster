import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginService, FacebookApiService, SettingsService, ParserService } from './services';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';

import 'hammerjs';
import { TopbarComponent } from './topbar/topbar.component';
import { SigninComponent } from './signin/signin.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    TopbarComponent,
    SigninComponent,
    MessageComponent
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
    SettingsService,
    ParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
