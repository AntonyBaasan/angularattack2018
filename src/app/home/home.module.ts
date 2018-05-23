import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ImportMaterialModule } from '../importmaterial/importmaterial.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ImportMaterialModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
