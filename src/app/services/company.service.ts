import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public company$: AngularFireObject<Company>;

  constructor(private af: AngularFireDatabase) {
    this.company$ = this.af.object('company');
  }

  // this is destructive (recrates an object)
  save(company: Company) {
    this.company$.set(company);
  }
}
