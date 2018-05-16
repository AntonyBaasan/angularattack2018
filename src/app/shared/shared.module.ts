import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDropComponent } from './image-drop/image-drop.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageDropComponent],
  exports: [ImageDropComponent],
  entryComponents: [ImageDropComponent]
})
export class SharedModule {}
