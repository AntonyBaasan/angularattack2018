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
  ) { }

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

    return this.http
      .get<any>(this.buildUrl(pageInfo));
    // .pipe(catchError(this.handleError('getReceipts', [])));
  }

  private buildUrl(pageInfo): string {
    return this.backendUrl + '?page=' + pageInfo.page + '&size=' + pageInfo.pageSize;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getReceipts(pageInfo: PageInfo): Observable<ModelChangeAction<Receipt>[]> {
  //   this.receipts$ = this.af.collection<Receipt>('receipts', ref =>
  //     ref.orderBy('date', 'desc').limit(pageInfo.pageSize)
  //   );

  //   return this.receipts$
  //     .stateChanges()
  //     .pipe(map(this.mapActionsToModelChangeActions));
  // }

  // private mapActionsToModelChangeActions(
  //   actions: DocumentChangeAction<Receipt>[]
  // ): ModelChangeAction<Receipt>[] {
  //   return actions.map(a => {
  //     // a.type
  //     // console.log(a);
  //     return {
  //       type: a.type,
  //       model: {
  //         key: a.payload.doc.id,
  //         ...a.payload.doc.data()
  //       }
  //     };
  //   });
  // }

  // loadMore(lastReceipt: Receipt, pageInfo: PageInfo) {
  //   const first = this.af.collection<Receipt>('receipts', ref =>
  //     ref
  //       .orderBy('date', 'desc')
  //       .startAfter(lastReceipt.date)
  //       .limit(pageInfo.pageSize)
  //   );

  //   return first.stateChanges().pipe(map(this.mapActionsToModelChangeActions));
  // }

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
