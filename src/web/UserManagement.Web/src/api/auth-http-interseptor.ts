import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ApplicationState } from "../services/application-state";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private applicationState: ApplicationState) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.applicationState.getAuthToken() || '';

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });

        return next.handle(authReq);
    }
} 