import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ItemsModule } from './items/items.module';
import { CompanyService } from './services/company.service';

const firebaseConfig = {
  apiKey: 'AIzaSyAE3HIecZZIZq078_S6iJ8Qc91k_nwbgI4',
  authDomain: 'fir-test-81536.firebaseapp.com',
  databaseURL: 'https://fir-test-81536.firebaseio.com',
  projectId: 'fir-test-81536',
  storageBucket: 'fir-test-81536.appspot.com',
  messagingSenderId: '659136704215'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule,
    AppRoutingModule,
    HomeModule,
    ItemsModule
  ],
  providers: [
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
