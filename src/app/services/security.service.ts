import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { map, last, tap, catchError } from 'rxjs/operators';
import { ModelChangeAction } from '../model/model-change-action.model';
import { PageInfo } from '../model/page-info.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.idToken.subscribe(token => {
        this.token = token;
    });
  }

  public getToken(): string {
    return this.token;
  }

}
