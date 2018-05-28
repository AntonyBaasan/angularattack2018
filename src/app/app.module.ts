import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';
import { ReceiptService } from './services/receipt.service';
import { SharedModule } from './shared/shared.module';
import { firebaseConfig } from './config/firebase-config';

import { ImportMaterialModule } from './importmaterial/importmaterial.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ImportMaterialModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    ItemsModule,
  ],
  providers: [ReceiptService],
  bootstrap: [AppComponent]
})
export class AppModule {}
