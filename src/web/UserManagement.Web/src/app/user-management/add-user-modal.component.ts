import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClient } from '../../api/api-client';
import { AppUsersCreateRequest } from '../../api/api-client-base.generated';
import { NotificationService } from '../../services/notification-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {

  userForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
    isAdmin: [false, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiClient: ApiClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddUserModalComponent>) {
  }

  async saveUser() {
    if (this.userForm.valid) {
      const request = {
        email: this.userForm.get('email')?.value,
        userName: this.userForm.get('userName')?.value,
        password: this.userForm.get('password')?.value,
        isAdmin: this.userForm.get('isAdmin')?.value
      } as AppUsersCreateRequest;

      this.apiClient.usersPOST(request).subscribe({
        next: response => {
          this.notificationService.notify('User is created');
          this.dialogRef.close();
        },
        error: e => {
          this.notificationService.notifyError(e.response);
        }
      });
    }
  }
}
