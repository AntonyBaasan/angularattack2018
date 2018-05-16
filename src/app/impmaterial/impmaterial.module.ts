import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatGridListModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class ImpmaterialModule {}
