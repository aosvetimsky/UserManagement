import { Injectable, Inject } from '@angular/core';
import * as generated from './api-client-base.generated';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../services/configuration-service';

@Injectable()
export class ApiClient extends generated.ApiClientBase {
    constructor(@Inject(HttpClient) http: HttpClient, private configurationService: ConfigurationService) {
        super(http, configurationService.apiBaseUrl);
    }
}
