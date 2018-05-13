import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Receipt } from '../model/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  public receipts$: AngularFireList<Receipt>;

  getReceipts(): Observable<Receipt[]> {
    return this.receipts$.valueChanges();
  }

  constructor(private af: AngularFireDatabase) {
    this.receipts$ = this.af.list('receipts');
  }

  // this is destructive (recrates an object)
  save(receipt: Receipt) {
    if (receipt.$key) {
      // this.receipts$.update(receipt);
    } else {
      this.receipts$.push(receipt);

    }
  }
}
