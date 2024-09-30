import { Injectable } from "@angular/core";

[Injectable()]
export class ConfigurationService {
    get apiBaseUrl(): string {
        return 'https://localhost:5001';
    }
}