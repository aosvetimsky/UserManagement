import { Injectable } from "@angular/core";
import { ApiClient } from "../api/api-client";
import { UserLoginRequest } from "../api/api-client-base.generated";
import { ApplicationService } from "./application-service";
import { User, UserIdentity } from "../app/model/User";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AccoutingService {
    constructor(private apiClient: ApiClient, private appService: ApplicationService) {
    }

    login(email: string, password: string): Observable<boolean> {
        const request = { email: email, password: password } as UserLoginRequest;
        return this.apiClient.login(request).pipe(
            map((response) => {
                if (!response || !response.user) {
                    return false;
                }

                const user = {
                    email: response.user.email,
                    userName: response.user.userName
                } as User;
                
                this.appService.setCurrentUser({
                    user: user,
                    token: response.token
                } as UserIdentity);

                return true;
            })
        );
    }

    logOut() {
        this.appService.removeCurrentUser();
    }
}