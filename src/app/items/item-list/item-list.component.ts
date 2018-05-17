import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TextutilsService } from '../../services/textutils.service';
import { Receipt } from '../../model/receipt.model';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  receipts$: Observable<Receipt[]>;
  targetReceipt: Receipt;

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.receipts$ = this.receiptService.getReceipts();
  }

  addNew() {
    this.targetReceipt = this.receiptService.getNewReceiptTemplate();
    this.showDialog(this.targetReceipt);
  }

  edit(receipt: Receipt) {
    this.targetReceipt = receipt;
    this.showDialog(this.targetReceipt);
  }

  private showDialog(receipt: Receipt) {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '550px',
      data: { receipt: _.cloneDeep(receipt) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remove(receipt: Receipt) {
    this.receiptService.remove(receipt);
  }
}
