import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TextutilsService } from '../../services/textutils.service';
import { Receipt } from '../../model/receipt.model';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  receipts$: Observable<Receipt[]>;
  isEditing = false;
  targetReceipt: Receipt;

  constructor(private receiptService: ReceiptService) {}

  ngOnInit() {
    this.receipts$ = this.receiptService.getReceipts();
  }

  addNew() {
    this.targetReceipt = this.receiptService.getNewReceiptTemplate();
    this.isEditing = true;
  }

  doneClick() {
    console.log('Done');
    this.isEditing = false;
  }

  edit(receipt: Receipt) {
    this.isEditing = true;
    this.targetReceipt = receipt;
  }

  remove(receipt: Receipt) {
    this.receiptService.remove(receipt);
  }
}
