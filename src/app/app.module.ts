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
  apiKey: 'AIzaSyD_D2Ui4e16t6dIR1LIVk5aL2C2McXEXqU',
  authDomain: 'angularattack2018.firebaseapp.com',
  databaseURL: 'https://angularattack2018.firebaseio.com',
  projectId: 'angularattack2018',
  storageBucket: 'angularattack2018.appspot.com',
  messagingSenderId: '838115089884'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HomeModule,
    ItemsModule
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
