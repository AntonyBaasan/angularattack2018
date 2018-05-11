import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsComponent } from './items.component';
import { ImpmaterialModule } from '../impmaterial/impmaterial.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ImpmaterialModule
  ],
  declarations: [ItemListComponent, ItemsComponent]
})
export class ItemsModule { }
