import { Component, Inject } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { AppUser } from '../../api/api-client-base.generated';
import { NotificationService } from '../../services/notification-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './upload-avatar-modal.component.html',
  styleUrls: ['./upload-avatar-modal.component.css']
})
export class UploadAvatarModalComponent {
  private files: FileList;

  constructor(
    private apiClient: ApiClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UploadAvatarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppUser) {
  }

  async uploadFiles(files: FileList | null) {
    if (files) {
      this.files = files;
    }
  }

  async uploadAvatar() {
    if (this.files.length > 0) {
      const file = this.files[0];
      this.apiClient.uploadAvatar(this.data.id!, { fileName: file.name, data: file }).subscribe({
        next: response => {
          this.notificationService.notify('Avatar is uploaded!');
          this.dialogRef.close();
        },
        error: e => {
          this.notificationService.notifyError(e.response);
        }
      });
    }
    else {
      this.notificationService.notifyError('File is not selected!');
    }
  }
}
