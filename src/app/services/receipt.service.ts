import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { map, last, tap, catchError } from 'rxjs/operators';
import { ModelChangeAction } from '../model/model-change-action.model';
import { PageInfo } from '../model/page-info.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
import { of } from 'rxjs/internal/observable/of';
import { Page } from '../model/page.model';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private backendUrl = 'http://localhost:8080/receipts';

  constructor(
    private af: AngularFirestore,
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  getNewReceiptTemplate(): Receipt {
    return {
      title: 'New title',
      description: 'New description',
      date: new Date(),
      total: 0
    };
  }

  getReceipts(pageInfo: PageInfo): Observable<Page<Receipt>> {
    const token: string = this.securityService.getToken();

    return this.http.get<any>(this.buildUrl(pageInfo));
  }

  private buildUrl(pageInfo): string {
    return (
      this.backendUrl + '?page=' + pageInfo.page + '&size=' + pageInfo.pageSize
    );
  }

  // this is destructive (recrates an object)
  save(receipt: Receipt) {
    if (receipt.id) {
      return this.http.put<Receipt>(this.backendUrl + 'asdf', receipt);
    } else {
      return this.http.post<Receipt>(this.backendUrl + 'asdfa', receipt);
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
