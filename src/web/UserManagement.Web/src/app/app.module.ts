import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiClient } from '../api/api-client';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { NotificationService } from '../services/notification-service';
import { AppComponent } from './app.component';
import { ConfigurationService } from '../services/configuration-service';
import { UsersComponent } from './user-management/users.component';
import { LoginComponent } from './accounting/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttpInterceptor } from '../api/auth-http-interseptor';
import { ApplicationState } from '../services/application-state';
import { AsyncPipe } from '@angular/common';
import { ApplicationService } from '../services/application-service';
import { AuthorizationService } from '../services/authorization-service';
import { AddUserModalComponent } from './user-management/add-user-modal.component';
import { UpdateUserModalComponent } from './user-management/update-user-modal.component';
import { UploadAvatarModalComponent } from './user-management/upload-avatar-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { ResourceUrlResolver } from '../services/resource-url-resolver';
import { ConfirmationModalComponent } from '../controls/confirmation-modal/confirmation-modal.component';
import { ConfirmationService } from '../services/confirmation-service';
import { AuthGuardFactory } from '../guards/auth-guard';
import { Permission } from './model/permisson';
import { WeatherHistoryComponent } from './weather/history/history.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [AuthGuardFactory.requiresPermission(Permission.UsersView)] },
  { path: 'user-management', component: UsersComponent, canActivate: [AuthGuardFactory.requiresPermission(Permission.UsersView)] },
  { path: 'weather/history', component: WeatherHistoryComponent },
  { path: 'accounting/login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    AddUserModalComponent,
    UpdateUserModalComponent,
    UploadAvatarModalComponent,
    ConfirmationModalComponent,
    WeatherHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    PlotlyModule,
    ToastrModule.forRoot({
      positionClass: 'toastr-bottom-right'
    }),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    ApiClient,
    ConfigurationService,
    NotificationService,
    ApplicationState,
    ApplicationService,
    AuthorizationService,
    ResourceUrlResolver,
    ConfirmationService,
    AuthGuardFactory,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
