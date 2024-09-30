import { Component, OnInit } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from '../../api/api-client-base.generated';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './add-user-modal.component';
import { NotificationService } from '../../services/notification-service';
import { AuthorizationService } from '../../services/authorization-service';
import { Permission } from '../model/permisson';
import { ApplicationService } from '../../services/application-service';
import { UpdateUserModalComponent } from './update-user-modal.component';
import { UploadAvatarModalComponent } from './upload-avatar-modal.component';
import { ConfigurationService } from '../../services/configuration-service';
import { ResourceUrlResolver } from '../../services/resource-url-resolver';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  totalCount: number = 0;
  dataSource = new MatTableDataSource<AppUser>();
  displayedColumns: string[] = ['userAvatar', 'userName', 'email', 'role', 'systemEntranceCount', 'lastSuccessfulEntrance', 'userActions'];
  users: AppUser[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private canDeleteUsers: boolean = false;
  private canEditUsers: boolean = false;

  constructor(private apiClient: ApiClient,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: AuthorizationService,
    private applicationService: ApplicationService,
    private configurationService: ConfigurationService,
    private resourceUrlResolver: ResourceUrlResolver) {
  }

  ngOnInit(): void {
    this.canDeleteUsers = this.authService.hasPermission(Permission.UserDelete);
    this.canEditUsers = this.authService.hasPermission(Permission.UserEdit);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const skip = this.paginator.pageIndex * this.paginator.pageSize;
          const take = this.paginator.pageSize;

          return this.apiClient.search(undefined,
            skip,
            take
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((response) => {
          if (!response) {
            this.notificationService.notifyError('Error loading users');
            return;
          }

          this.totalCount = response.totalCount || 0;
          return response.users || [];
        })
      )
      .subscribe((users) => {
        this.users = users || [];
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  async deleteUser(appUser: AppUser) {
    this.apiClient.usersDELETE(appUser.id!).subscribe(response => {
      this.reloadUsers();
    });
  }

  async addUser() {
    let dialogRef = this.dialog.open(AddUserModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.reloadUsers();
    });
  }

  async editUser(appUser: AppUser) {
    this.apiClient.usersGET(appUser.id!).subscribe({
      next: response => {
        let dialogRef = this.dialog.open(UpdateUserModalComponent, { data: { user: appUser, isReadOnlyMode: !this.canEditUsers } });

        dialogRef.afterClosed().subscribe(result => {
          this.reloadUsers();
        });
      },
      error: e => {
        this.notificationService.notifyError(e.response);
      }
    });
  }

  private async reloadUsers() {
    this.paginator.page.emit();
  }

  async uploadAvatar(user: AppUser) {
    let dialogRef = this.dialog.open(UploadAvatarModalComponent, { data: user });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadUsers();
    });
  }

  showDeleteButton(user: AppUser) {
    return this.canDeleteUsers && user.email !== this.applicationService.currentUser?.email;
  }

  get showAddUserButton() {
    return this.canEditUsers;
  }

  showUploadAvatarButton(user: AppUser) {
    return this.canEditUsers || user.email === this.applicationService.currentUser?.email;
  }

  get getEditViewButtonName() {
    return this.canEditUsers ? 'Edit' : 'View';
  }

  getUserAvatarUrl(user: AppUser) {
    if (user.avatarUrl) {
      return this.resourceUrlResolver.resolveFromRelativePath(user.avatarUrl);
    }

    return '/assets/images/no-image.png';
  }
}

