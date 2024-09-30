import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiClient } from '../../api/api-client';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users.component';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { NotificationService } from '../../services/notification-service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialComponentsModule
  ],
  providers: [ApiClient, NotificationService],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
