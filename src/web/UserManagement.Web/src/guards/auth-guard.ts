import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthorizationService } from "../services/authorization-service";
import { ApplicationService } from "../services/application-service";
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardFactory {
    static requiresPermission(...permissions: string[]): CanActivateFn {
        return (ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot): Observable<boolean> => {
            const appService = inject(ApplicationService);
            const authService = inject(AuthorizationService);
            return appService.loadUserPermissions().pipe(map((r) => {
                return authService.hasAnyPermission([...permissions]);
            }));
        }
    }
}


