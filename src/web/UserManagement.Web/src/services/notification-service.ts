import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private readonly toastr: ToastrService) {
    }
    notifyError(message: string) {
        this.toastr.error(message);
    }

    notify(message: string) {
        this.toastr.success(message);
    }
}