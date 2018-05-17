import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';
import { map } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  public receipts$: AngularFireList<Receipt>;

  getNewReceiptTemplate(): Receipt {
    return {
      title: 'New title',
      description: 'New description',
      date: new Date(''),
      total: 0
    };
  }
  getReceipts(): Observable<Receipt[]> {
    return this.receipts$.snapshotChanges().map(actions => {
      return actions.map(snap => {
        return { key: snap.key, ...snap.payload.val() } as Receipt;
      });
    });
  }

  constructor(private af: AngularFireDatabase) {
    this.receipts$ = this.af.list('receipts');
  }

  // this is destructive (recrates an object)
  save(receipt: Receipt) {
    if (receipt.key) {
      this.receipts$.update(receipt.key, receipt);
      // this.receipts$.set(receipt.key, receipt);
    } else {
      return this.receipts$.push(receipt);
    }
  }

  remove(receipt: Receipt) {
    if (receipt.key) {
      this.receipts$.remove(receipt.key);
    }
  }
}
