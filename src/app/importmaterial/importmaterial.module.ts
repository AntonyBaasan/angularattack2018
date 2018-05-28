import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatExpansionModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatExpansionModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class ImportMaterialModule { }
