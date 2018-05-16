import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsComponent } from './items.component';
import { ImpmaterialModule } from '../impmaterial/impmaterial.module';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, ItemsRoutingModule, ImpmaterialModule, SharedModule],
  declarations: [ItemListComponent, ItemsComponent, ItemEditComponent],
  entryComponents: [
    ItemEditComponent // this fixes material dialog component issue
  ]
})
export class ItemsModule {}
