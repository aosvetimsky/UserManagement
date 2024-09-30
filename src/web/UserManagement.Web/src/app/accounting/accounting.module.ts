import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiClient } from '../../api/api-client';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { NotificationService } from '../../services/notification-service';
import { LoginComponent } from './login.component';
import { AccoutingService } from '../../services/accounting-service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialComponentsModule
  ],
  providers: [ApiClient, NotificationService, AccoutingService],
  bootstrap: [LoginComponent]
})
export class AccountingModule { }
