import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { map, last } from 'rxjs/operators';
import { ModelChangeAction } from '../model/model-change-action.model';
import { PageInfo } from '../model/page-info.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  public receipts$: AngularFirestoreCollection<Receipt>;

  getNewReceiptTemplate(): Receipt {
    return {
      title: 'New title',
      description: 'New description',
      date: new Date(),
      total: 0
    };
  }

  getReceipts(pageInfo: PageInfo): Observable<ModelChangeAction<Receipt>[]> {
    this.receipts$ = this.af.collection<Receipt>('receipts', ref =>
      ref.orderBy('date', 'desc').limit(pageInfo.pageSize)
    );

    return this.receipts$
      .stateChanges()
      .pipe(map(this.mapActionsToModelChangeActions));
  }

  private mapActionsToModelChangeActions(
    actions: DocumentChangeAction<Receipt>[]
  ): ModelChangeAction<Receipt>[] {
    return actions.map(a => {
      // a.type
      // console.log(a);
      return {
        type: a.type,
        model: {
          key: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      };
    });
  }

  loadMore(lastReceipt: Receipt, pageInfo: PageInfo) {
    const first = this.af.collection<Receipt>('receipts', ref =>
      ref
        .orderBy('date', 'desc')
        .startAfter(lastReceipt.date)
        .limit(pageInfo.pageSize)
    );

    return first.stateChanges().pipe(map(this.mapActionsToModelChangeActions));
  }

  constructor(private af: AngularFirestore) {
    this.receipts$ = this.af.collection<Receipt>('receipts');
  }

  // this is destructive (recrates an object)
  save(receipt: Receipt) {
    if (receipt.key) {
      this.receipts$.doc(receipt.key).update(receipt);
    } else {
      return this.receipts$.add(receipt);
    }
  }

  remove(receipt: Receipt) {
    if (receipt.key) {
      this.receipts$.doc(receipt.key).delete();
    }
  }

  removeMany(receipts: Receipt[]) {
    _.forEach(receipts, r => {
      this.remove(r);
    });
  }
}
