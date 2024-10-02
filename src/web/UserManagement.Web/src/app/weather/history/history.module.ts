import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiClient } from '../../../api/api-client';
import { HttpClientModule } from '@angular/common/http';
import { WeatherHistoryComponent } from './history.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ApiClient],
  bootstrap: [WeatherHistoryComponent]
})
export class WeatherHistoryModule { }
