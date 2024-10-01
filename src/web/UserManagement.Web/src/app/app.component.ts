import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application-service';
import { map } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private applicationService: ApplicationService, private router: Router) {
  }
  ngOnInit() {
    this.applicationService.tryRestoreCurrentUser();

    this.applicationService.$currentUser.subscribe(currentUser => {
      if (!currentUser) {
        console.log('accounting');
        this.router.navigateByUrl('/accounting/login');
      }
      else {
        console.log('user');
        this.router.navigateByUrl('/');
      }
    });

    if (!this.applicationService.currentUser) {
      this.router.navigateByUrl('/accounting/login');
    }
  }

  get userName() {
    return this.applicationService?.$currentUser.pipe(
      map(user => {
        return user?.userName ?? 'Guest';
      })
    );
  }

  get userLoggedIn() {
    return this.applicationService?.$currentUser.pipe(
      map(user => {
        return !!user;
      })
    );
  }

  async logOut() {
    this.applicationService.removeCurrentUser();
  }
}