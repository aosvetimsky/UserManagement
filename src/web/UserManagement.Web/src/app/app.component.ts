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
        this.router.navigateByUrl('/accounting/login');
      }
      else {
        this.router.navigateByUrl('/');
      }
    });
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