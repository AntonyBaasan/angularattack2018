import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { map } from 'rxjs/operators';
import { ModelChangeAction } from '../model/model-change-action.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  public receipts$: AngularFirestoreCollection<Receipt>;

  getNewReceiptTemplate(): Receipt {
    return {
      title: 'New title',
      description: 'New description',
      date: null,
      total: 0
    };
  }
  getReceipts(): Observable<ModelChangeAction<Receipt>[]> {
    // return this.receipts$.snapshotChanges();
    return this.receipts$.stateChanges().pipe(
      map(actions => actions.map(a => {
        // a.type
        console.log(a);
        return {
          type: a.type,
          model: {
            key: a.payload.doc.id,
            ...a.payload.doc.data(),
          }
        };
      }))
    );
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
