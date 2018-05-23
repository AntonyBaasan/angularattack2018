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
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class ImpmaterialModule { }
