import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDropComponent } from './image-drop/image-drop.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageDropComponent, AuthComponent],
  exports: [ImageDropComponent, AuthComponent],
  entryComponents: [ImageDropComponent]
})
export class SharedModule {}
