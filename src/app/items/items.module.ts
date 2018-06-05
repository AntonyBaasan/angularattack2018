import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFilterComponent } from './item-filter/item-filst.component';
import { ItemsComponent } from './items.component';
import { ImportMaterialModule } from '../importmaterial/importmaterial.module';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsRoutingModule,
    ImportMaterialModule,
    SharedModule
  ],
  declarations: [
    ItemListComponent,
    ItemsComponent,
    ItemEditComponent,
    ItemFilterComponent,
  ],
  entryComponents: [
    ItemEditComponent // this fixes material dialog component issue
  ]
})
export class ItemsModule {}
