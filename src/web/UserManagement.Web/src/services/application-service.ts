import { Injectable } from "@angular/core";
import { ApiClient } from "../api/api-client";
import { User, UserIdentity } from "../app/model/user-identity";
import { ReplaySubject, map } from "rxjs";
import { ApplicationState } from "./application-state";

@Injectable({ providedIn: 'root' })
export class ApplicationService {

    private currentUserSource = new ReplaySubject<User | null>(1);
    $currentUser = this.currentUserSource.asObservable();
    currentUser: User | null;

    permissions: string[] = [];

    constructor(private apiClient: ApiClient, private appState: ApplicationState) {
    }

    loadUserPermissions() {
        return this.apiClient.userPermissions().pipe(
            map((response) => {
                this.permissions = response.permissions || [];
            })
        );
    }

    tryRestoreCurrentUser(): boolean {
        const userIdentity = this.appState.getUserIdentity();
        if (userIdentity) {
            this.setCurrentUser(userIdentity);
            return true;
        }

        return false;
    }

    setCurrentUser(userIdentity: UserIdentity) {
        this.appState.setUserIdentity(userIdentity);
        this.currentUser = userIdentity.user;
        this.currentUserSource.next(userIdentity.user);
    }

    removeCurrentUser() {
        this.appState.removeUserIdentity();
        this.currentUser = null;
        this.currentUserSource.next(null);
    }
}