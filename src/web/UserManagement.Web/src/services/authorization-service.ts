import { Injectable } from "@angular/core";
import { ApplicationService } from "./application-service";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    constructor(private appService: ApplicationService) {
    }

    hasPermission(permission: string): boolean {
        return (this.appService.permissions || []).includes(permission);
    }

    hasAnyPermission(permissions: string[]): boolean {
        return (this.appService.permissions || []).some(p => permissions.includes(p));
    }
}