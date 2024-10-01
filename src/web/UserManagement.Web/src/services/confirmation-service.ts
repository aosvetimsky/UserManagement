import { Injectable } from "@angular/core";
import { ConfirmationModalComponent } from "../controls/confirmation-modal/confirmation-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
    constructor(private dialog: MatDialog,) {
    }

    confirm(title: string, message: string): Observable<boolean> {
        let dialogRef = this.dialog.open(ConfirmationModalComponent, { data: { title: title, message: message } });

        return dialogRef.afterClosed();
    }
}