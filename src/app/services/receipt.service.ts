import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { PageInfo } from '../model/page-info.model';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Page } from '../model/page.model';
import { URLSearchParams } from '@angular/http';
import { FilterInfo } from '../model/filter-info.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private backendUrl = 'http://localhost:8080/receipts';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getNewReceiptTemplate(): Receipt {
    return {
      title: 'New title',
      description: 'New description',
      date: new Date(),
      total: 0
    };
  }

  getReceipts(
    pageInfo: PageInfo,
    filterInfo: FilterInfo
  ): Observable<Page<Receipt>> {
    return this.http.get<any>(
      this.backendUrl +
        this.buildUrl(pageInfo, '?') +
        this.buildUrl(filterInfo, '&')
    );
  }

  private buildUrl(obj: any, prefix: string): string {
    const queryString = new URLSearchParams();
    for (const key in obj) {
      if (!_.isNil(obj[key])) {
        if (obj[key] instanceof Date) {
          queryString.set(key, this.datePipe.transform(obj[key], 'MM/dd/yyyy'));
        } else {
          queryString.set(key, obj[key]);
        }
      }
    }
    const result = queryString.toString();
    if (result) {
      return prefix + result;
    } else {
      return '';
    }
  }

  // this is destructive (recrates an object)
  save(receipt: Receipt) {
    if (receipt.id) {
      return this.http.put<Receipt>(this.backendUrl, receipt);
    } else {
      return this.http.post<Receipt>(this.backendUrl, receipt);
    }
  }

  remove(receipt: Receipt) {
    if (receipt && receipt.id) {
      return this.http.delete(this.backendUrl + '/' + receipt.id);
    }

    return Observable.throw(new Error('Invalid receipt!'));
  }

  // removeMany(receipts: Receipt[]) {
  //   _.forEach(receipts, r => {
  //     this.remove(r);
  //   });
  // }
}
