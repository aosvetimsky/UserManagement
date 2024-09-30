import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClient } from '../../api/api-client';
import { AppUser, AppUsersUpdateRequest } from '../../api/api-client-base.generated';
import { NotificationService } from '../../services/notification-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent {
  userForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required]],
    isAdmin: [false, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiClient: ApiClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: AppUser, isReadOnlyMode: false }) {
    this.userForm.get('email')?.setValue(this.data.user.email);
    this.userForm.get('userName')?.setValue(this.data.user.userName);
    this.userForm.get('isAdmin')?.setValue(this.data.user.isAdmin);

    if (this.data.isReadOnlyMode) {
      this.userForm.get('email')?.disable();
      this.userForm.get('userName')?.disable();
      this.userForm.get('isAdmin')?.disable();
    }
  }

  async updateUser() {
    if (this.userForm.valid) {
      const request = {
        email: this.userForm.get('email')?.value,
        userName: this.userForm.get('userName')?.value,
        isAdmin: this.userForm.get('isAdmin')?.value
      } as AppUsersUpdateRequest;

      this.apiClient.usersPUT(this.data.user.id!, request).subscribe({
        next: response => {
          this.notificationService.notify('User is updated');
          this.dialogRef.close();
        },
        error: e => {
          this.notificationService.notifyError(e.response);
        }
      });
    }
  }

  get isReadOnlyMode() {
    return this.data.isReadOnlyMode;
  }
}
