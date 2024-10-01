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
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-management', component: UsersComponent },
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
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    AsyncPipe,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
