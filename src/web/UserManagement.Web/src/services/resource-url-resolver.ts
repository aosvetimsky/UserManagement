import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration-service";

@Injectable({ providedIn: 'root' })

export class ResourceUrlResolver {
    constructor(private readonly configurationService: ConfigurationService) {
    }

    resolveFromRelativePath(relativePath: string) {
        return `${this.configurationService.apiBaseUrl}/${relativePath}`;
    }
}