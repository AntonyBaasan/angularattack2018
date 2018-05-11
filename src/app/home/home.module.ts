import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ImpmaterialModule } from '../impmaterial/impmaterial.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ImpmaterialModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
