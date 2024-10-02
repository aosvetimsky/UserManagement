import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        MatTableModule,
        CommonModule,
        MatInputModule,
        MatSelectModule,
         MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatToolbarModule
    ],
    exports: [
        MatTableModule,
        MatInputModule,
        MatSelectModule,
         MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatToolbarModule
    ],
})
export class MaterialComponentsModule { }
