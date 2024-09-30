import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification-service';
import { AccoutingService } from '../../services/accounting-service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['admin@gmail.com', Validators.required],
    password: ['Ab12345$', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private accountingService: AccoutingService) {
  }

  async login() {
    if (this.loginForm.valid) {
      this.accountingService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
        {
          next: response => {
            this.router.navigateByUrl('/');
          },
          error: e => {
            this.notificationService.notifyError(e.response);
          }
        }
      );
    }
  }
}

